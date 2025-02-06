const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// adding a package for hashing the password in case of saving it from threat or attacks
const bcrypt = require('bcryptjs');

// regarding the usage of webtoken we are using the jwt package here
const jwt = require('jsonwebtoken');
const JWT_SECRET = "WebTokenStringSecure";              // Secure Web Token key required to sign web token

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

        // Creating a salt here for adding it to the main password
        const salt = bcrypt.genSaltSync(10);

        // Creating a variable for having a secure password before passing it to the main database
        let securePass = await bcrypt.hash(req.body.password,salt);

        // Creating a user here with proper error management if it not already exists
        user = await User.create({
            name : req.body.name,
            username : req.body.username,
            email : req.body.email,
            password : securePass
        })

        const data = {                      // creating a data on the basis of which the user returns to the site
            user : {
                id : User.id                // user's unique id available in the database
            }
        }

        // Creating a signature here for the user's identity
        const jwtToken = jwt.sign(data,JWT_SECRET);
        res.json({jwtToken});

    } catch (error){                    // if any kind of error occurs it would directly gets handled
        console.error(error.message);   // getting the error to be simply shown

        // returning a particular response error from the server side
        res.status(500).send("Some Error occured from the server side !");
    }
})

module.exports = router;