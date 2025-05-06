const express = require('express');
const router = express.Router();
const { createJobApplication, getJobApplications, searchApplications,  deleteJobApplication } = require('../controller/jobApplicationController');
const { jwtAuthMiddleware } = require('../middleware/jwt');
const { uploadSingle } = require('../services/aws');

// Create a new job application
router.post('/create', jwtAuthMiddleware, uploadSingle, createJobApplication);

// Get all job applications
router.get('/all', jwtAuthMiddleware, getJobApplications);

//search job applications
router.get('/search', jwtAuthMiddleware, searchApplications);

// Delete a job application by ID
router.delete('/delete/:id', jwtAuthMiddleware, deleteJobApplication);

module.exports = router;

