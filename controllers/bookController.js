const { Book } = require('../models');

const addBook = async (req, res) => {
  try {
    const { title, author, genre, publicationYear } = req.body;
    const newBook = await Book.create({ title, author, genre, borrowed: false, publicationYear });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.update(req.body, { where: { id } });
    if (updatedBook[0]) {
      res.status(200).json({ message: 'Book updated successfully' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.destroy({ where: { id } });
    if (result) {
      res.status(200).json({ message: 'Book deleted successfully' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const viewBooks = async (req, res) => {
  try {
    const { title, author, genre } = req.query;
    const filters = {};
    if (title) filters.title = title;
    if (author) filters.author = author;
    if (genre) filters.genre = genre;
    const books = await Book.findAll({ where: filters });
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const borrowBook = async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findByPk(id);
      if (!book) return res.status(404).json({ message: 'Book not found' });
      if (book.borrowed) return res.status(400).json({ message: 'Book already borrowed' });
  
      book.borrowed = true;
      await book.save();
      res.status(200).json({ message: 'Book borrowed successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

const returnBook = async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findByPk(id);
      if (!book) return res.status(404).json({ message: 'Book not found' });
  
      book.borrowed = false;
      await book.save();
      res.status(200).json({ message: 'Book returned successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};
  
const viewBorrowedBooks = async (req, res) => {
    try {
      const books = await Book.findAll({ where: { borrowed: true } });
      res.status(200).json(books);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

module.exports = {
  addBook,
  updateBook,
  deleteBook,
  viewBooks,
  borrowBook,
  returnBook,
  viewBorrowedBooks
};
