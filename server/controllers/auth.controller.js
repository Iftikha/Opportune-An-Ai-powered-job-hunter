const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/User.model');

// REGISTER USER
const registerUser = async (req, res) => {
    const { name, email, password, accountType, confirmPassword, gender } = req.body;

    if (!name || !email || !password || !accountType || !confirmPassword || !gender) {
        return res.status(400).json({ error: "Incomplete data." });
    }

    try {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(409).json({ error: "Email already exists." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match." });
        }

        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");

        const userCreated = await User.create({ 
            name, 
            email, 
            password: hashedPassword, 
            accountType,
            gender
        });
        const jwtToken = jwt.sign({ id: userCreated._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRESIN
        });
        
        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({ 
            message: "User created successfully.", 
            user: { id: userCreated._id, email: userCreated.email },
            token: jwtToken,
        });

    } catch (err) {
        console.error("Error creating user:", err);
        return res.status(500).json({ error: "Internal server error." });
    }
};


// LOGIN
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({ error: "Incomplete or invalid information."});
    }
    try{
        let userExists = await User.findOne({ email });
        if(!userExists){
            return res.status(404).json({ error: "User not found."});
        }

        let passwordMatched = await bcrypt.compare(password, userExists.password);
        if(!passwordMatched){
            return res.status(400).json({ error: "Incorrect password!"});
        }

        let token = jwt.sign({id : userExists._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRESIN});
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "none"
        });

        return res.status(200).json({ message: "Log in successful.", userFound: userExists, token: token });
    }catch(err){
        console.log("Error while logging in: " + err);
        return res.status(500).json({ error: "Internal server error." });
    }
};

// LOGOUT
const logoutUser = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out."});
}

module.exports = { registerUser, loginUser, logoutUser};
