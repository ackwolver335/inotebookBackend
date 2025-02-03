const express = require('express');
const User = require('../models/User');
const router = express.Router();


// Creating a User using: POST "/api/auth". Doesn't requires Auth
router.post('/',(req,res) => {
    console.log(req.body);
    const user = User(req.body);                    // Creating a new user here
    user.save();                                    // saving the user here
    res.send(req.body);
})

module.exports = router;