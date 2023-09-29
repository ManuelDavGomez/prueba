const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Sample data - Replace with a database in a real application
let books = [
  { id: 1, title: "Book 1", author: "Author 1" },
  { id: 2, title: "Book 2", author: "Author 2" },
  { id: 3, title: "Book 3", author: "Author 3" },
];

app.get("/", (req, res) => {
  res.send("<h1>Hola mundo</h1>");
});

// GET all books
app.get("/api/books", (req, res) => {
  res.json(books);
});

// GET a specific book by ID
app.get("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
});

// POST a new book
app.post("/api/books", (req, res) => {
  const book = req.body;
  books.push(book);
  res.status(201).json(book);
});

// PUT (update) an existing book by ID
app.put("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedBook = req.body;

  books = books.map((book) => (book.id === id ? updatedBook : book));
  res.json(updatedBook);
});

// DELETE a book by ID
app.delete("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter((book) => book.id !== id);
  res.json({ message: "Book deleted" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
