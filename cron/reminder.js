const cron = require("node-cron");
const sendDueReminders = require("../util/sendDueReminders");

cron.schedule("*/10 * * * *", async () => {
  await sendDueReminders();
});
