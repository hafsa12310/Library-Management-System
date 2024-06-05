const { User } = require('../models');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
  try {
    const { name, email, contactNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, contactNumber, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.update(req.body, { where: { id } });
    if (updatedUser[0]) {
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.destroy({ where: { id } });
    if (result) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const viewUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  updateUser,
  deleteUser,
  viewUsers
};
