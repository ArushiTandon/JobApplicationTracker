const { DataTypes } = require("sequelize");
const sequelize = require("../util/db");

const Reminder = sequelize.define("Reminder", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  jobApplicationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  reminderDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  isSent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

}, {
  timestamps: true,
});

module.exports = Reminder;
