const User = require("../models/user");

const createUser = async (req, res) => {
  try {
    const { name } = req.body;
    const buildUser = await User.create({ name });
    const user = await buildUser.save();
    return res.status(200).json({ user, status: "Success" });
  } catch (error) {
    throw error;
  }
};

const getAllUser = async (req, res) => {
  const users = await User.findAll();

  return res.status(200).json({ users });
};

module.exports = { getAllUser, createUser };
