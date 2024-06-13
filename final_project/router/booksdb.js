let books = {
      1: {"author": "Chinua Achebe","title": "Things Fall Apart", "reviews": {} },
      2: {"author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {} },
      3: {"author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {} },
      4: {"author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {} },
      5: {"author": "Unknown","title": "The Book Of Job", "reviews": {} },
      6: {"author": "Unknown","title": "One Thousand and One Nights", "reviews": {} },
      7: {"author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": {} },
      8: {"author": "Jane Austen","title": "Pride and Prejudice", "reviews": {} },
      9: {"author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": {} },
      10: {"author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
}

// Adding a review to the first book
books[1].reviews = {
    1: { "reviewer": "John Doe", "rating": 5, "comment": "A compelling read." },
    2: { "reviewer": "Jane Smith", "rating": 4, "comment": "Very interesting, but a bit complex." }
  };
  
  // Adding a review to the second book
  books[2].reviews = {
    1: { "reviewer": "Alice Johnson", "rating": 5, "comment": "Wonderful tales for all ages." }
  };
  
  module.exports = books;
