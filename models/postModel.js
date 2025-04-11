const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Comment = require("./commentModel");

const Post = sequelize.define("post", {
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
});

Post.hasMany(Comment)

module.exports = Post;
