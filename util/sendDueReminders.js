// utils/sendDueReminders.js
const { Op } = require("sequelize");
const Reminder = require("../model/reminder");
const User = require("../model/user");
const sendEmail = require("../services/sendGrid");

const sendDueReminders = async () => {
  const now = new Date();
  const inTenMinutes = new Date(now.getTime() + 10 * 60 * 1000);

  const reminders = await Reminder.findAll({
    where: {
      reminderDate: {
        [Op.between]: [now, inTenMinutes],
      },
      isSent: false,
    },
    include: [User],
  });

  for (const reminder of reminders) {
    await sendEmail({
      to: reminder.User.email,
      subject: "🔔 Reminder for Job Application",
      text: reminder.message,
      html: `<p>${reminder.message}</p>`,
    });

    reminder.isSent = true;
    await reminder.save();
  }

  console.log(`${reminders.length} reminders sent`);
};

module.exports = sendDueReminders;
