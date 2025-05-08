const User = require("./user");
const Company = require("./company");
const Job = require("./job");
const JobApplication = require("./jobApplication");
const Reminder = require("./reminder");
const SavedJob = require("./savedJob");
const Notes = require("./notes");


// User has many JobApplications
User.hasMany(JobApplication, { foreignKey: "userId" });
JobApplication.belongsTo(User, { foreignKey: "userId" });

// User has many Notes
User.hasMany(Notes, { foreignKey: "userId" });
Notes.belongsTo(User, { foreignKey: "userId" });

// User has many SavedJobs
User.hasMany(SavedJob, { foreignKey: "userId" });
SavedJob.belongsTo(User, { foreignKey: "userId" });

// Company has many Jobs
Company.hasMany(Job, { foreignKey: "companyId" });
Job.belongsTo(Company, { foreignKey: "companyId" });

// Company has many JobApplications
Company.hasMany(JobApplication, { foreignKey: "companyId" });
JobApplication.belongsTo(Company, { foreignKey: "companyId" });

// Job can be saved (SavedJob)
Job.hasMany(SavedJob, { foreignKey: "jobId" });
SavedJob.belongsTo(Job, { foreignKey: "jobId" });

// JobApplication has many Reminders
JobApplication.hasMany(Reminder, { foreignKey: "jobApplicationId" });
Reminder.belongsTo(JobApplication, { foreignKey: "jobApplicationId" });

User.hasMany(Reminder, { foreignKey: 'userId' });
Reminder.belongsTo(User, { foreignKey: 'userId' });

// // User has many Companies (will change it to admin later)
// User.hasMany(Company, { foreignKey: "userId" });
// Company.belongsTo(User, { foreignKey: "userId" });