const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/',[

    // Applying different validation checks here,
    body('name','User must provide his/her name here for further Validations !').notEmpty(),
    body('username','Please enter a valid username here regarding Account Creation !').isLength({ min : 8 }),
    body('email','Please enter a valid email here !').isEmail(),
    body('password','You must enter a strong password regarding your data security !').isStrongPassword().isLength({ min : 8})

],async (req,res) => {
       
    // Checking if there is any kind of errors here regarding the incoming data
    const result = validationResult(req);
    
    // applying the condition here
    if(!result.isEmpty()){                           // Checking if there is any kind of errors
        return res.status(400).json({result : result.array()});
    }

    // Creating a user here with proper error management
    User.create({
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    }).then(user => res.json(user)).catch(error => {
        console.error(error)
        res.json({warning : "Please enter proper details otherwise your wouldn't be able to use the services !",
            error_Message : error.message
        });
    })
})

module.exports = router;