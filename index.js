require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;  // Vercel typically uses PORT 3000 for Node.js apps

// Middleware
app.use(cors());
app.use(express.json());

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start the server after MongoDB connection
const startServer = async () => {
  try {
    await connectToMongo();  // Connect to MongoDB
    console.log("Connected to MongoDB successfully!");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // Ensure the process exits after a clean start
    process.exit(0);  // Force process exit after starting the server
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);  // Exit the process if MongoDB connection fails
  }
};

startServer();  // Call the startServer function