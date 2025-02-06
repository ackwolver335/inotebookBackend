const mongoose = require('mongoose');
const { Schema } = mongoose;                        // Schema is defined here

const userSchema = new Schema({
    name:{
        type : String,
        required : true
    },
    username: {                 // unique property removed only be applied to the user name
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user',userSchema)