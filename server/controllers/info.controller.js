const jwt = require('jsonwebtoken');
// const User = require('../models/User.model');

const getUserInfo = async (req, res) => {

    try {
        const token = req.cookies.token; // cookie se token
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "Success", user});  // request me user attach kar rahe hain
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }    
}

module.exports = getUserInfo;