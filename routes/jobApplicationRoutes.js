const express = require('express');
const router = express.Router();
const { createJobApplication, getJobApplications, searchApplications, updateJobApplication, deleteJobApplication } = require('../controller/jobApplicationController');
const { jwtAuthMiddleware } = require('../middleware/jwt');
// const { uploadFile } = require('../middleware/fileUpload');

// Create a new job application
router.post('/application/create', jwtAuthMiddleware, createJobApplication);

// Get all job applications
router.get('/application/all', jwtAuthMiddleware, getJobApplications);

// Get a specific job application by ID
router.get('/application/:jobId', jwtAuthMiddleware, getJobApplications);

//search job applications
router.get('/search', jwtAuthMiddleware, searchApplications);

// Update a job application by ID
router.put('/application/update/:jobId', jwtAuthMiddleware,  updateJobApplication);

// Delete a job application by ID
router.delete('/application/:jobId', jwtAuthMiddleware, deleteJobApplication);

module.exports = router;