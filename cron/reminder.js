const cron = require("node-cron");
const { Op } = require("sequelize");
const Reminder = require("../model/reminder");
const User = require("../model/user");
const sendEmail = require("../services/sendGrid");

cron.schedule("0 * * * *", async () => {
  const now = new Date();
  const inOneHour = new Date(now.getTime() + 60 * 60 * 1000);

  const reminders = await Reminder.findAll({
    where: {
      reminderDate: {
        [Op.between]: [now, inOneHour],
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
});
