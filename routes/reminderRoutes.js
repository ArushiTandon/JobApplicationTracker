const express = require('express');
const router = express.Router();
const reminderController = require('../controller/reminderController');
const { jwtAuthMiddleware } = require('../middleware/jwt');
const sendDueReminders = require("../util/sendDueReminders");


// Create a new reminder
router.post('/create', jwtAuthMiddleware , reminderController.createReminder);

// Get all reminders for user
router.get('/all', jwtAuthMiddleware, reminderController.getReminders)

//update reminder
router.put('/update/:reminderId', jwtAuthMiddleware, reminderController.updateReminder);

// Delete a reminder by ID
router.delete('/delete/:reminderId', jwtAuthMiddleware, reminderController.deleteReminder);



router.get("/test-send", async (req, res) => {
  try {
    await sendDueReminders();
    res.send("Test reminders triggered successfully!");
  } catch (err) {
    console.error("Failed to send test reminders:", err);
    res.status(500).send("Failed to send reminders.");
  }
});

module.exports = router;