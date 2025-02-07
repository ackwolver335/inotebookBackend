const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');            // for validation of upcoming notes properly

// Using the middleware here to fetch the details of the user
const fetchuser = require('../middleware/fetchUser');

// importing the notes model here regarding the schema & data of the notes
const Notes = require('../models/Notes');

// ROUTE 1 : For fetching all the notes of the user regarding a particular id : Login Required {would get automatically with middleware}
// Here we're using the get request as we need to fetch the token from the header of the link/url [Get Request]
router.get('/fetchallnotes', fetchuser,
    
    // Asynchronous method here for awaiting at a particular situation
    async (req,res) => {
    
        // using the try catch block not in order to get stucked with some errors
        try{

            // fetching the notes in a particular user using its id
            const notes = await Notes.find({user : req.user.id});
            res.json(notes);

        } catch (error){                    // if any kind of error occurs it would directly gets handled
            console.error(error.message);   // getting the error to be simply shown
    
            // returning a particular response error from the server side
            res.status(500).send("Some Error occured from the server side !");
        }

})

// ROUTE 2 : Adding the Notes in the Database : Login Required {would get automatically} [Post Request]
router.post('/addnotes', fetchuser,[                             // changing the endpoint to createuser

    // Applying different validation checks here,
    body('title','Title must be valid !').notEmpty().isLength({ min : 5}),
    body('description','Your description must be within 15 character at minimum !').isLength({ min : 15 })

],
    
    // Asynchronous method here for awaiting at a particular situation
    async (req,res) => {
    
        // using the try catch not to get caught with some different category of errors
        try {
            
            // destructuring the data in order to retrieve the data from the body
            const {title,description,tag} = req.body;

            // getting the validation result together by error checks
            const result = validationResult(req);
            if(!result.isEmpty()){                                                  // situation if there is any error
                return res.status(400).json({errors : errors.array()});             // returning bad request if there is any error while validation checks
            }

            // Creating a new note in order to save here
            const note = new Notes({                                                // it will return a promise here in order to send the notes related data here
                title,description,tag,user : req.user.id
            })

            // saving the note with await in order to wait at this point
            const savedNote = await note.save()
            res.json(savedNote);                                                    // sending the note as response when it is saved

        } catch (error){                    // if any kind of error occurs it would directly gets handled
            console.error(error.message);   // getting the error to be simply shown
    
            // returning a particular response error from the server side
            res.status(500).send("Some Error occured from the server side !");
        }

})

module.exports = router;