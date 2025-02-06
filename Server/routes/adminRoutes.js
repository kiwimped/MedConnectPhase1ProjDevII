const express = require('express');
const router = express.Router();
const { getUsers, addUser, deleteUser } = require('../controllers/adminController');

// GET all users
router.get('/users', getUsers);

// POST a new user
router.post('/users', addUser);

// DELETE a user
router.delete('/users/:id', deleteUser);

module.exports = router;