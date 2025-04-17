const express = require('express');
const router = express.Router();
const reminderController = require('../controller/reminderController');
const { jwtAuthMiddleware } = require('../middleware/jwt');
const { put } = require('./jobApplicationRoutes');


// Create a new reminder
router.post('/create', jwtAuthMiddleware , reminderController.createReminder);

// Get all reminders for user
router.get('/all', jwtAuthMiddleware, reminderController.getReminders)

//update reminder
router.put('/update/:reminderId', jwtAuthMiddleware, reminderController.updateReminder);

// Delete a reminder by ID
router.delete('/delete/:reminderId', jwtAuthMiddleware, reminderController.deleteReminder);


module.exports = router;