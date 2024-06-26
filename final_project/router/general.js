const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

public_users.post("/register", (req, res) => {
    const { username, password } = req.body;
  
    // Check if both username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
  
    // Check if the username already exists
    const userExists = users.some(user => user.username === username);
    if (userExists) {
      return res.status(409).json({ message: "Username already exists" });
    }
  
    // Add the new user to the users list
    users.push({ username, password });
  
    // Return success response
    return res.status(201).json({ message: "User registered successfully" });
  });



public_users.get('/', function (req, res) {
    // Convert the book data to a JSON string and send it as a response
    const bookList = JSON.stringify(books, null, 2); // Pretty print with 2 spaces indentation
    return res.status(200).json(JSON.parse(bookList)); // Parse it back to JSON object to send
});

public_users.get('/', async (req, res) => {
  try {
   const bookList = JSON.stringify(books, null, 2); // Pretty print with 2 spaces indentation

    // Send the response
    return res.status(200).json(bookList);
  } catch (error) {
    console.error('Error fetching book list:', error.message);
    return res.status(500).json({ message: 'Failed to fetch book list' });
  }
});

// Route to get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
    const ISBN = req.params.isbn; // Access ISBN from request parameters
    

    try {
      // Check if the book with the provided ISBN exists in the local database
      if (!books[ISBN]) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      // Simulated external API endpoint for fetching additional book details by ISBN
      // const apiUrl = `https://api.example.com/books/${ISBN}`;
  
      // Fetch book details from the external API using Axios
      // const response = await axios.get(apiUrl);
  
      // Combine local book data with fetched book details
      const bookDetails = {
        ...books[ISBN], // Local book details
        
      };
  
      return res.status(200).json(bookDetails); // Return combined book details
    } catch (error) {
      // Handle errors from Axios or external API
      console.error('Error fetching book details:', error.message);
      return res.status(500).json({ message: 'Failed to fetch book details' });
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

// Route to get book details based on author
public_users.get('/author/:author', (req, res) => {
    const author = req.params.author;
    const booksByAuthor = [];
  
    // Simulating an Axios request (replace with actual API call or database query)
    axios.get('https://example.com/api/books') // Example API endpoint
      .then(response => {
        // Assuming response.data is an array of books fetched from the API
        const booksFromApi = response.data;
  
        // Filter books by the provided author
        booksFromApi.forEach(book => {
          if (book.author === author) {
            booksByAuthor.push(book);
          }
        });
  
        // Check if books by author were found
        if (booksByAuthor.length > 0) {
          return res.status(200).json(booksByAuthor);
        } else {
          return res.status(404).json({ message: "Author not found" });
        }
      })
      .catch(error => {
        console.error('Error fetching books:', error.message);
        return res.status(500).json({ message: 'Failed to fetch books' });
      });
  });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const ISBN = req.params.isbn
  if (books [ISBN]) {
    return res.status(200).json(books[ISBN].reviews);
  } 
  else {
    return res.status(404).json({message: "Book not found"});
  }
});

// Route to get book details based on title
public_users.get('/title/:title', (req, res) => {
    const title = req.params.title;
    const booksByTitle = [];
  
    // Simulating an Axios request (replace with actual API call or database query)
    axios.get('https://example.com/api/books') // Example API endpoint
      .then(response => {
        // Assuming response.data is an array of books fetched from the API
        const booksFromApi = response.data;
  
        // Filter books by the provided title
        booksFromApi.forEach(book => {
          if (book.title.toLowerCase().includes(title.toLowerCase())) {
            booksByTitle.push(book);
          }
        });
  
        // Check if books by title were found
        if (booksByTitle.length > 0) {
          return res.status(200).json(booksByTitle);
        } else {
          return res.status(404).json({ message: "Books with title not found" });
        }
      })
      .catch(error => {
        console.error('Error fetching books:', error.message);
        return res.status(500).json({ message: 'Failed to fetch books' });
      });
  });
  
module.exports.general = public_users;
