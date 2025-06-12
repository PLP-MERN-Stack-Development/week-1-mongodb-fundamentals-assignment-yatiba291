# 📚 PLP Bookstore MongoDB Project

## How to Run the Scripts

### Prerequisites
- Make sure you have **MongoDB** installed locally or have access to a MongoDB Atlas cluster.
- Install **Node.js** if you want to run the scripts using Node.

### 1. Insert Sample Data

To populate your database with sample books, run the following command in your terminal:

```sh
mongosh < insert_books.js
```

This will insert the book documents into the `plp_bookstore.books` collection.

### 2. Run MongoDB Queries

You can execute all your queries using:

```sh
mongosh < queries.js
```

This will run all the queries in the `queries.js` file against your database.

### 3. Using MongoDB Compass

- Open MongoDB Compass and connect to your local server or Atlas cluster.
- Select the `plp_bookstore` database to view your `books` collection and data.

---

**Note:**  
- Make sure your MongoDB server is running before executing the scripts.
- Edit the connection string in your scripts if you are using MongoDB Atlas.
