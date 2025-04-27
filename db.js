// getting the mongoose here
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

// method for connecting to mongoose
const connectToMongo = async () => {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully!");
}

module.exports = connectToMongo;