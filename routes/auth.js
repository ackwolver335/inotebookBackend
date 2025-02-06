const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/createuser',[                             // changing the endpoint to createuser

    // Applying different validation checks here,
    body('name','User must provide his/her name here for further Validations !').notEmpty(),
    body('username','Please enter a valid username here regarding Account Creation !').isLength({ min : 8 }).isAlphanumeric(),
    body('email','Please enter a valid email here !').isEmail(),
    body('password','You must enter a strong password regarding your data security !').isStrongPassword().isLength({ min : 8})

],async (req,res) => {
       
    // Checking if there is any kind of errors here regarding the incoming data
    const result = validationResult(req);
    
    // applying the condition here
    if(!result.isEmpty()){                           // Checking if there is any kind of errors
        return res.status(400).json({result : result.array()});
    }

    // applying a try catch statement for getting safe from the server side of issues
    try{
        // Checking if the user already exists here
        let user = await User.findOne({email : req.body.email});
        if(user){

            // returning a bad request if the user already exists here
            return res.status(400).json({error : "Warning : A user with this email already exists !"});

        }

        // Creating a user here with proper error management if it not already exists
        user = await User.create({
            name : req.body.name,
            username : req.body.username,
            email : req.body.email,
            password : req.body.password
        })

        // Returning the response of the user if created
        res.json(user);
    } catch (error){                    // if any kind of error occurs it would directly gets handled
        console.error(error.message);   // getting the error to be simply shown

        // returning a particular response error from the server side
        res.status(500).send("Some Error occured from the server side !");
    }
})

module.exports = router;