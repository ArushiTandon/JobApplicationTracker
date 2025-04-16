const { DataTypes } = require("sequelize");
const sequelize = require("../util/db");

const Company = sequelize.define("Company", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  industry: {
    type: DataTypes.STRING,
  },

  location: {
    type: DataTypes.STRING,
  },
  
  contactEmail: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
  },

  contactPhone: {
    type: DataTypes.STRING,
  },

  notes: {
    type: DataTypes.TEXT,
  },

}, {
  timestamps: true,
});


module.exports = Company;
