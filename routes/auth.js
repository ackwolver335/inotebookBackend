const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');


router.post('/',[

    // Applying different validation checks here,
    body('username').isLength({ min : 8 }).withMessage('Username must contains atleast 8 characters !'),
    body('email').isEmail().withMessage('Invalid Email Format'),
    body('password').isStrongPassword().isLength({ min : 8}).withMessage('Password must contain Lowercase, Uppercase, Numerical Values & Symbols in it !')

],async (req,res) => {
       
    // Checking if there is any kind of errors here regarding the incoming data
    const result = validationResult(req);
    
    // applying the condition here
    if(!result.isEmpty()){                           // Checking if there is any kind of errors
        return res.status(400).json({result : result.array()});
    }

    // Applying a try catch here in order to maintain the error handling in case of creating a user here
    try{
        const user = User(req.body);
        await user.save();                      // Saving the user's details after a proper confirmation check

        // Proper message towards the developer
        res.status(200).json({message : "User Created Successfully !",user});
    } 
    
    // Error Checks regarding different kinds of issues before any user gets created
    catch (error){
        console.error(error);
        res.status(500).json({message : "Internal Server Error !"});
    }
})

module.exports = router;