const express = require("express");
const router = express.Router();
const { jwtAuthMiddleware } = require("../middleware/jwt");
const Job = require('../controller/jobController');

//create a new job : admin
router.post('/create', jwtAuthMiddleware, Job.createJob);

//get all jobs
router.get('/all', jwtAuthMiddleware, Job.getAllJobs);

//view job
router.get('/view/:id', jwtAuthMiddleware, Job.viewJob);

// save a job
router.post('/save', jwtAuthMiddleware, Job.saveJob);

//get saved jobs
router.get('/saved', jwtAuthMiddleware, Job.getSavedJobs);

//un-save a job
router.delete('/saved/:id', jwtAuthMiddleware, Job.unsaveJob);

//update a job : admin
router.put('/update/:id', jwtAuthMiddleware, Job.updateJob);

//delete a job : admin
router.delete('/delete/:id' , jwtAuthMiddleware, Job.deleteJob);

module.exports = router;