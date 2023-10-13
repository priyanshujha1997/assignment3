require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/user');
const logger = require('./logger');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', usersRouter);

mongoose.connect('mongodb://localhost:27017/user-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  logger.info('Connected to MongoDB');
});

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

module.exports = app;
