
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Post = require('./postModel')
const Comment = require('./commentModel')

const bcrypt = require("bcrypt")

const User = sequelize.define(
  "user",
  {
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    firstName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, Number(process.env.SALT_ROUND));
        }
      },
    },
  }
);

User.hasMany(Post)

User.hasMany(Comment)
Comment.belongsTo(User);

module.exports = User;
