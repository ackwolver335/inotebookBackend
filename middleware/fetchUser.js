// regarding the usage of webtoken we are using the jwt package here
const jwt = require('jsonwebtoken');
const JWT_SECRET = "WebTokenStringSecure";              // Secure Web Token key required to sign web token

// method or function to fetch the user's details after login 
// not to get irritated while visiting at different endpoints
const fetchuser = (req,res,next) => {

    // fetching the user using the token avaialble here together by adding the id to the request object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error : "Please authenticate using a valid token !"});        // Unauthorized Error here
    }

    // In case the token is not valid
    try {
        
        // verifying the token here
        const verifiedString = jwt.verify(token,JWT_SECRET);
        req.user = verifiedString.user;

        next();         // the async function available in another file will run afterwards

    } catch (error) {
        res.status(401).send({error : "Please authenticate using a valid token !"});        // Unauthorized Error here
    }

}

module.exports = fetchuser