const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const { registerUser, loginUser, logoutUser, verifyUser } = require('../controllers/auth.controller');


const authRoutes = new express.Router();

//  Register User.

authRoutes.post('/auth/register', registerUser);

// Login User.

authRoutes.post('/auth/login', loginUser);

// Signout User.

authRoutes.get('/auth/signout', logoutUser);

module.exports = authRoutes;