// index.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection middleware (connect lazily)
app.use(async (req, res, next) => {
  try {
    await connectToMongo();
    next();
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    res.status(500).send('Database connection failed');
  }
});

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Export app for Vercel
module.exports = app;
