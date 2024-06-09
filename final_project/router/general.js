const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

public_users.get('/', function (req, res) {
    // Convert the book data to a JSON string and send it as a response
    const bookList = JSON.stringify(books, null, 2); // Pretty print with 2 spaces indentation
    return res.status(200).json(JSON.parse(bookList)); // Parse it back to JSON object to send
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const ISBN = req.params.isbn; // Access ISBN from request parameters

    // Check if the book with the provided ISBN exists in the books database
    if (books[ISBN]) {
        return res.status(200).json(books[ISBN]); // Return book details if found
    } else {
        return res.status(404).json({ message: "Book not found" }); // Book not found
    }
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const booksByAuthor = [];

  for (let id in books) {
    if (books[id].author === author) {
      booksByAuthor.push(books[id]);
    }
  }

  if (booksByAuthor.length > 0) {
    return res.status(200).json(booksByAuthor);
  } else {
    return res.status(404).json({ message: "Author not found" });
  }

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title
  const booksByTitle = [];

  for (let id in books){
    if (books[id].title === title) {
        booksByTitle.push(books[id]);
    }
  }

  if (booksByTitle.length > 0){
    return res.status(200).json(booksByTitle);
  }
  else {
    return res.status(404).json({message: "Title not found"});
  }

  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
