const { DataTypes } = require("sequelize");
const sequelize = require("../util/db");

const Job = sequelize.define("Job", {

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    postedDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },

    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    salary: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    jobType: {
        type: DataTypes.STRING,
        allowNull: false,
    }

}, 
{
    timestamps: true,
});

module.exports = Job;