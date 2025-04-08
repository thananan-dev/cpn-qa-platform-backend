const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Post = sequelize.define("post", {
  title: DataTypes.TEXT,
  description: DataTypes.TEXT,
  authorId:DataTypes.TEXT,
});

module.exports = Post;
