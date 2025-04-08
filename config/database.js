const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("postgres", "postgres", "password", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { sequelize, connection };
