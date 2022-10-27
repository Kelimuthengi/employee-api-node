const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {

    const authorization = await req.headers.authorization;
    
    if(!authorization || !authorization.startsWith('Bearer ')){
        return res.status(401).json({message:'authorization failed no headers'})
    }

    const token = authorization.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = { userId:payload.userId, username:payload.username}
        next()
    } catch (error) {
        res.status(500).json({message:error.message})
    }

    
}

module.exports = auth