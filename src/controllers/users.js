const User = require('../models/user');
const logger = require('../logger');

// Create a user
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    logger.error(`Error creating user: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (err) {
      logger.error(`Error updating user: ${err.message}`);
      res.status(400).json({ error: err.message });
    }
  };
  

// Get a list of users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    logger.error(`Error getting users: ${err.message}`);
    res.status(500).json({ error: 'Server error' });
  }
};
