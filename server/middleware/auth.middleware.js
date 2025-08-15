const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const authUser = async (req, res, next) => {
  const token = req.cookies?.token;
  console.log("Token from cookies:", token); // 👀 Check actual value

  if (!token) {
    return res
      .status(401)
      .json({ error: "Access denied. No token provided." });
  }

  try {
    const decode = jwt.verify(token.trim(), process.env.JWT_SECRET);
    console.log("Decoded JWT:", decode);
    
    const user = await User.findById(decode.id);
    console.log("User Found:" , user);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("JWT Verify Error:", err.message);
    res.status(400).json({ error: "Invalid token." });
  }
};


module.exports = {
  authUser,
};
