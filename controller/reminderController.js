const { sequelize } = require('../util/db');
const Reminder = require('../model/reminder');

exports.createReminder = async (req, res) => {

  const { jobApplicationId, reminderDate, message } = req.body;

  try {
    const reminder = await Reminder.create({
      userId: req.user.id,
      jobApplicationId,
      reminderDate,
      message,
    });

    res.status(201).json({ message: "Reminder created", reminder });

  } catch (err) {
    console.error("Error creating reminder:", err);
    res.status(500).json({ error: "Failed to create reminder" });
  }
};

exports.getReminders = async (req, res) => {

  try {

    const reminders = await Reminder.findAll({ where: { userId: req.user.id } });
    res.status(200).json({ reminders });

  } catch (err) {
    console.error("Error fetching reminders:", err);
    res.status(500).json({ error: "Failed to fetch reminders" });
  }
};

exports.updateReminder = async (req, res) => {

  try {

    const reminder = await Reminder.findByPk(req.params.id);
    if (!reminder) return res.status(404).json({ error: "Reminder not found" });

    await reminder.update(req.body);
    res.status(200).json({ message: "Reminder updated", reminder });

  } catch (err) {
    console.error("Error updating reminder:", err);
    res.status(500).json({ error: "Failed to update reminder" });
  }
};

exports.deleteReminder = async (req, res) => {
  try {

    const reminder = await Reminder.findByPk(req.params.id);
    if (!reminder) return res.status(404).json({ error: "Reminder not found" });

    await reminder.destroy();
    res.status(200).json({ message: "Reminder deleted" });

  } catch (err) {
    console.error("Error deleting reminder:", err);
    res.status(500).json({ error: "Failed to delete reminder" });
  }
};
