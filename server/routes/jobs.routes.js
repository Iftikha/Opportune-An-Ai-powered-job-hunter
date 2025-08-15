const express = require('express');
const { authEmployeer } = require('../middleware/employeer.middleware');
const { postJob, updateJob, deleteJob, applyToAJob, getJobDetails, getAllJobs } = require('../controllers/job.controller');
const { authUser } = require('../middleware/auth.middleware');
const getRecommendation = require('../controllers/ai.controller');
const { authProfile } = require('../middleware/profile.middleware');


const jobRoutes = new express.Router();


// Get all jobs.

jobRoutes.get('/jobs', getAllJobs);

// Get job details.

jobRoutes.get('/jobs/:id', getJobDetails);

// Apply to a specific job.

jobRoutes.post('/jobs/apply/:id', authUser, applyToAJob);

// Post job.

jobRoutes.post('/jobs', authEmployeer, postJob);

// Update job.pmvpw

jobRoutes.put('/jobs/:id', authEmployeer, updateJob);

// Delete job.

jobRoutes.delete('/jobs/:id', authEmployeer, deleteJob);

// GEMINI API Trigger.

jobRoutes.get('/ai/jobs/recommended', authUser, authProfile, getRecommendation);

module.exports = jobRoutes;