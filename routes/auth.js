const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { query, validationResult } = require('express-validator');
const { ValidationHalt } = require('express-validator/lib/base');
const app = express();


// Creating a User using: POST "/api/auth". Doesn't requires Auth
// router.get('/',(req,res) => {
//     console.log(req.body);                          // getting the incoming data
//     const user = User(req.body);                    // Creating a new user here
//     user.save();                                    // saving the user here
//     res.send(req.body);
// })

router.post('/',[

    // Applying different validation checks here
    query('name').isLength({ min : 4}),
    query('username').isLength({ min : 8 }),
    query('email').isEmail(),
    query('password').isLength({ min : 8})

],(req,res) => {
    const result = validationResult(req);
    const user = User(req.body);                    // Creating a new user here
    user.save();                                    // saving the user here
    
    // applying the condition here
    if(!(result.isEmpty())){
        return res.send(`Response ,${req.query.name}!`);
    }

    res.send({ errors : result.array()});
})

module.exports = router;