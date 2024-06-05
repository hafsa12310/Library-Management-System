const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.post('/add', bookController.addBook);
router.put('/update/:id', bookController.updateBook);
router.delete('/delete/:id', bookController.deleteBook);
router.get('/view', bookController.viewBooks);
router.post('/borrow/:id', authenticateToken, bookController.borrowBook);
router.post('/return/:id', authenticateToken, bookController.returnBook);
router.get('/borrowed', authenticateToken, bookController.viewBorrowedBooks);

module.exports = router;