const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const User = sequelize.define("user", {
  name: DataTypes.TEXT,
});

module.exports = User;
