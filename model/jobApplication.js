const { DataTypes } = require("sequelize");
const sequelize = require("../util/db");

const JobApplication = sequelize.define(
  "JobApplication",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
   
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    applicationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "Applied",
        "Interviewed",
        "Offered",
        "Rejected",
        "Accepted"
      ),
      defaultValue: "Applied",
    },

    notes: {
      type: DataTypes.TEXT,
    },

    resumeUrl: {
      type: DataTypes.STRING,
    },
    
    location: {
      type: DataTypes.STRING,
    },

  },
  {
    timestamps: true,
  }
);

  
module.exports = JobApplication;