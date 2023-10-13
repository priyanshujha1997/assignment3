const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

// Create a user
router.post('/users', usersController.createUser);

// Update a user
router.put('/users/:id', usersController.updateUser);

// Get a list of users
router.get('/users', usersController.getUsers);

module.exports = router;
