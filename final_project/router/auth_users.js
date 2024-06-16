const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const secretKey = 'your_secret_key';


let users = [];

const isValid = (username) => {
  // Check if the username exists in the users array
  return users.some(user => user.username === username);
}

const authenticatedUser = (username, password) => {
  // Check if the username and password match a registered user
  return users.some(user => user.username === username && user.password === password);
}

// Only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Validate the user
  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate a JWT
  const token = jwt.sign({ username }, 'your_secret_key', { expiresIn: '1h' });

  // Send the JWT in the response
  return res.status(200).json({ message: "Login successful", token });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const { rating, comment } = req.body;
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  let username;
  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    username = decoded.username;
  } catch (err) {
    return res.status(401).json({ message: "Failed to authenticate token" });
  }

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!rating || !comment) {
    return res.status(400).json({ message: "Rating and comment are required" });
  }

  let reviews = books[isbn].reviews;
  let userReviewId = null;

  for (let reviewId in reviews) {
    if (reviews[reviewId].reviewer === username) {
      userReviewId = reviewId;
      break;
    }
  }

  if (userReviewId) {
    reviews[userReviewId] = { reviewer: username, rating, comment };
  } else {
    const newReviewId = Object.keys(reviews).length + 1;
    reviews[newReviewId] = { reviewer: username, rating, comment };
  }

  return res.status(200).json({ message: "Review added/updated successfully" });
});


// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const authHeader = req.headers['authorization'];
  
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }
  
    const token = authHeader.split(' ')[1];
  
    let username;
    try {
      const decoded = jwt.verify(token, secretKey);
      username = decoded.username;
    } catch (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }
  
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }
  
    let reviews = books[isbn].reviews;
    let userReviewId = null;
  
    for (let reviewId in reviews) {
      if (reviews[reviewId].reviewer === username) {
        userReviewId = reviewId;
        break;
      }
    }
  
    if (userReviewId) {
      delete reviews[userReviewId];
      return res.status(200).json({ message: "Review deleted successfully" });
    } else {
      return res.status(404).json({ message: "Review not found" });
    }
  });
  

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
