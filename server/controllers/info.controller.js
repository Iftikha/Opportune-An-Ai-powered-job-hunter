const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const getUserInfo = async (req, res) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(404).json({ error: "User not found."});
        }
        res.json({ message: "Success", user});
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
}

module.exports = getUserInfo;