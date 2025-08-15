const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const authUser = async (req, res, next) => {
  try {
    const token = req.cookie.token;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decode.id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
};

module.exports = {
  authUser,
};
