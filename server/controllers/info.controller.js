const jwt = require('jsonwebtoken');
// const User = require('../models/User.model');

const getUserInfo = async (req, res) => {

    const lo
 token = req.cookies.token; // cookie me se token le
    if (!token) {
        return res.status(401).json({ error: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id; // yahi tumhara user ka _id hai

        // ab tum userId se DB query kar sakte ho
        res.json({ userId });
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
}

module.exports = getUserInfo;