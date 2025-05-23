const { DataTypes } = require("sequelize");
const sequelize = require("../util/db");

const JobApplication = sequelize.define(
  "JobApplication",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

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