const { Sequelize } = require("sequelize");

const credential = {
  db: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST_URL,
};

const sequelize = new Sequelize(
  credential.db,
  credential.username,
  credential.password,
  {
    host: credential.host,
    port: 5432,
    dialect: "postgres",
  }
);

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { sequelize, connection };
