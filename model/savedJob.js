const { DataTypes } = require("sequelize");
const sequelize = require("../util/db");

const SavedJob = sequelize.define("SavedJob", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  savedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = SavedJob;
