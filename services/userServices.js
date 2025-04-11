const User = require("../models/userModel");

const getAllUsers = async (userId) => {
  const users = await User.findAll();
  return users;
};

const getUserById = async (userId) => {
  const user = await User.findOne({ where: { id: userId } });
  return user;
};

const getUserByUsername = async (username) => {
  const user = await User.findOne({ where: { username } });
  return user;
};

const createUser = async (username, firstName, lastName, password) => {
  const buildUser = await User.create({ username, firstName, lastName, password });
  const user = await buildUser.save();

  return user;
};

module.exports = { getAllUsers, getUserById, getUserByUsername, createUser };
