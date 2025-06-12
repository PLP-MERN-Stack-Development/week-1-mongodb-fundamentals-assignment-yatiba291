// Find all books in a specific genre (e.g., 'Fiction')
db.books.find({ genre: "Fiction" })

// Find books published after a certain year (e.g., 1950)
db.books.find({ published_year: { $gt: 1950 } })

// Find books by a specific author (e.g., 'George Orwell')
db.books.find({ author: "George Orwell" })

// Update the price of a specific book (e.g., 'The Alchemist' to $15.99)
db.books.updateOne(
  { title: "The Alchemist" },
  { $set: { price: 15.99 } }
)

// Delete a book by its title (e.g., 'Animal Farm')
db.books.deleteOne({ title: "Animal Farm" })



// 2 Advanced Queries
// Find books in stock AND published after 2010 (empty result in this dataset)
db.books.find({ 
  in_stock: true, 
  published_year: { $gt: 2010 } 
})

// Projection: Only title, author, and price fields
db.books.find(
  { genre: "Fiction" },
  { _id: 0, title: 1, author: 1, price: 1 }
)

// Sorting by price (ascending)
db.books.find().sort({ price: 1 })

// Sorting by price (descending)
db.books.find().sort({ price: -1 })

// Pagination: Page 1 (5 books per page)
db.books.find().skip(0).limit(5)

// Pagination: Page 2
db.books.find().skip(5).limit(5)



// 3 Aggregation Pipeline
// Aggregation: Count books by genre
db.books.aggregate([
  { $group: { _id: "$genre", count: { $sum: 1 } } }
])


// Average price of books by genre
db.books.aggregate([
  { $group: { 
      _id: "$genre", 
      avgPrice: { $avg: "$price" } 
  } }
])

// Author with the most books
db.books.aggregate([
  { $group: { 
      _id: "$author", 
      bookCount: { $sum: 1 } 
  } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
])

// Books grouped by publication decade (e.g., 1940s)
db.books.aggregate([
  { $addFields: {
      decade: { 
        $subtract: [
          "$published_year", 
          { $mod: ["$published_year", 10] }
        ]
      }
  } },
  { $group: { 
      _id: "$decade", 
      count: { $sum: 1 } 
  } },
  { $sort: { _id: 1 } }
])








// 4 Create index on title field
db.books.createIndex({ title: 1 })

// Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 })

// Demonstrate performance improvement for title search
db.books.find({ title: "1984" }).explain("executionStats")
// (Check "totalKeysExamined" and "executionTimeMillis" after indexing)

// Demonstrate performance improvement for author/year search
db.books.find({ 
  author: "J.R.R. Tolkien", 
  published_year: { $gte: 1930 }
}).explain("executionStats")