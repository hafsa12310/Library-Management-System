const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = process.env.PORT || 3000;


const sequelize = new Sequelize('library_db', 'library_user', 'postgres', {
  host: '127.0.0.1',
  dialect: 'postgres'
});


sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit the application if unable to connect to the database
  });

  
const User = require('./models/user')(sequelize, DataTypes);
const Book = require('./models/book')(sequelize, DataTypes);

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

// Routes

// Add a new book
app.post('/books', async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a book
app.put('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    await book.update(req.body);
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a book
app.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    await book.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// View all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Register a user
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update user details
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// View all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Borrow a book
app.post('/borrow/:userId/:bookId', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const book = await Book.findByPk(req.params.bookId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    if (book.borrowed) return res.status(400).json({ error: 'Book is already borrowed' });

    book.userId = user.id;
    book.borrowed = true;
    await book.save();

    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Return a book
app.post('/return/:userId/:bookId', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const book = await Book.findByPk(req.params.bookId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    if (!book.borrowed || book.userId !== user.id) return res.status(400).json({ error: 'Book is not borrowed by this user' });

    book.userId = null;
    book.borrowed = false;
    await book.save();

    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// View borrowed books by user
app.get('/users/:userId/borrowed-books', async (req, res) => {
  try {
    const books = await Book.findAll({
      where: {
        userId: req.params.userId,
        borrowed: true }
      });
      res.json(books);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  
  module.exports = app;
