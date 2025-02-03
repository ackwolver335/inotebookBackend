// getting the mongoose here
const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017"               // connection string

// method for connecting to mongoose
const connectToMongo = async () => {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully!");
}

module.exports = connectToMongo;