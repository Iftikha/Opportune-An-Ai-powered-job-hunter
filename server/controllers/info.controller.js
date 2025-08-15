const jwt = require('jsonwebtoken');
// const User = require('../models/User.model');

const getUserInfo = (req, res) => {
    const token  = res.cookie.token;
    if(!token){
        return res.status(401).json({ error: "No token provided"});
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: "Token Decoed!", id: decoded.id});    
}

module.exports = getUserInfo;