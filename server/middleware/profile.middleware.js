const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee.model');
const Employeer = require('../models/Employeer.model');
const User = require('../models/User.model');

const isNewProfile = async (req, res, next) => {
    try {
        const token = req.cookie.token;
        if (!token) {
            return res.status(401).json({ error: "Access Denied. No token provided." });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const userExists = await User.findById(decode.id);
        if (!userExists) {
            return res.status(404).json({ error: "User not found." });
        }

        const accountType = userExists.accountType;

        if (accountType === "employee") {
            const existingProfile = await Employee.findOne({ userId: userExists._id });
            if (existingProfile) {
                return res.status(409).json({ error: "Profile already exists." });
            }
        } else if (accountType === "employeer") {
            const existingProfile = await Employeer.findOne({ userId: userExists._id });
            if (existingProfile) {
                return res.status(409).json({ error: "Profile already exists." });
            }
        } else {
            return res.status(400).json({ error: "Invalid account type." });
        }

        req.type = accountType;
        req.user = userExists;
        next();

    } catch (err) {
        res.status(401).json({ error: "Invalid token." });
    }
};


const authProfile = async (req, res, next) => {
    try {
        const token = req.cookie.token;
        if (!token) {
            return res.status(401).json({ error: "Access Denied. No token provided." });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const userExists = await User.findById(decode.id);
        if (!userExists) {
            return res.status(404).json({ error: "User not found." });
        }

        const accountType = userExists.accountType;

        if (accountType === "employee") {
            const profileFound = await Employee.findOne({ userId: userExists._id });
            if (!profileFound) {
                return res.status(404).json({ message: "Profile not found." });
            }
        } else if (accountType === "employeer") {
            const profileFound = await Employeer.findOne({ userId: userExists._id });
            if (!profileFound) {
                return res.status(404).json({ message: "Profile not found." });
            }
        } else {
            return res.status(400).json({ error: "Invalid account type." });
        }

        req.user = userExists;
        req.type = accountType;
        next();

    } catch (err) {
        res.status(401).json({ error: "Invalid token." });
    }
};

module.exports = {
    isNewProfile,
    authProfile,
};