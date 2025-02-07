const mongoose = require('mongoose');
const { Schema } = mongoose;


const notesSchema = new Schema({

    // adding a foriegn key here for getting the user & its notes linked
    user : {
        type : mongoose.Schema.Types.ObjectId,                                  // getting the user id with this
        ref : 'user'
    },

    title:{
        type : String,
        required : true
    },
    description: {
        type : String,
        required : true
    },
    tag:{
        type : String,
        default : "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('notes',notesSchema)