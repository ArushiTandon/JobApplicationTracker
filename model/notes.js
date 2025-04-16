const { DataTypes } = require("sequelize");
const sequelize = require("../util/db");


const Notes = sequelize.define("Notes", {

    note: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},

{
    timestamps: true,
})

module.exports = Notes;