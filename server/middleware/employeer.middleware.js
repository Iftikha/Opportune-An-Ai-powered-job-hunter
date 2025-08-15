const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const authEmployeer = async (req, res, next) => {
    try{
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if(!token){
            return res.status(401).json({ error: "Access denied. No token provided."});
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode.id);
        if(!user){
            return res.status(404).json({ error: "User not found."});
        }
        if(user.accountType !== 'employeer'){
            return res.status(403).json({ error: "Only employers can post jobs."});
        }
        req.user = user;
        next();
    }catch(err){
        res.status(400).json({ error: "Invalid token."});
    }
}

module.exports = {
    authEmployeer,
}