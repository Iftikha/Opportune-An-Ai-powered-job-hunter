const express = require('express');
const { authUser } = require('../middleware/auth.middleware');
const { isNewProfile, authProfile} = require('../middleware/profile.middleware');
const { createProfile, updateProfile, viewProfile } = require('../controllers/profile.controller');
// const { upload } = require('../utils/imageUpload');
const multer = require('multer');

// storage config
const storage = multer.memoryStorage();
const upload = multer({ storage });

const profileRoutes = new express.Router();

// Create Employee/Employeer Profile.

profileRoutes.post('/profile/create', authUser, upload.single('logo'), createProfile);

// Update Employee/Employeer Profile.

profileRoutes.put('/profile/update/:id', authUser, authProfile, updateProfile);

// View Employee/Employeer Profile.

profileRoutes.get('/profile/:id', authUser, authProfile, viewProfile);

module.exports = profileRoutes;