const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      ssl: true,                 // Enforce SSL connection
      serverSelectionTimeoutMS: 5000, // Timeout for server selection
    });
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);  // Exit process with failure if connection fails
  }
};

module.exports = connectToMongo;
