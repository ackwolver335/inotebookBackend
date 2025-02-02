// getting the mongoose here
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/"               // connection string

// method for connecting
const connectToMongoose = () => {
    mongoose.connect(mongoURI);
}

module.exports = connectToMongoose;