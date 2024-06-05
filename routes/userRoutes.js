const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);
router.get('/view', userController.viewUsers);

module.exports = router;
