// index.js

require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Connect to MongoDB once
connectToMongo()
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);  // Fail hard if DB doesn't connect
  });

// Export the Express app (no app.listen here!)
module.exports = app;
