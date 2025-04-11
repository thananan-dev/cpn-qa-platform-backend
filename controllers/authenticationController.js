const jwt = require("jsonwebtoken");

const userServices = require("../services/userServices");

const status = require("../constants/status");
const messages = require("../common/messages");
const handleRequestUtils = require("../utils/handleRequestUtils");
const handleAuthorizationUtils = require("../utils/handleAuthorizationUtils");
const { sequelize } = require("../config/database");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (handleRequestUtils.handleRequestInvalidBody(username, password)) {
      return res
        .status(400)
        .json({ status: status.FAILED, message: messages.InvalidRequest });
    }

    const user = await userServices.getUserByUsername(username);

    if (!user) {
      return res.status(404).json({
        status: status.FAILED,
        messages: "User not found",
      });
    }

    const validatePassword = await handleAuthorizationUtils.validatePassword(
      password,
      user.dataValues.password
    );

    if (validatePassword) {
      const userData = {
        id: user.dataValues.id,
        firstName: user.dataValues.firstName,
        lastName: user.dataValues.lastName,
      };

      const token = jwt.sign({ user: userData }, process.env.JWT_PRIVATE_KEY);
      
      return res
        .status(200)
        .json({ status: status.SUCCESS, message: "Login successful", token });
    } else {
      return res
        .status(400)
        .json({ status: status.FAILED, message: "Password Invalid" });
    }
  } catch (error) {
    return res.status(500).json({ status: status.FAILED, error });
  }
};

const register = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { username, firstName, lastName, password } = req.body;

    if (
      handleRequestUtils.handleRequestInvalidBody(
        username,
        firstName,
        lastName,
        password
      )
    ) {
      return res
        .status(400)
        .json({ status: status.FAILED, message: messages.InvalidRequest });
    }

    const user = await userServices.createUser(
      username,
      firstName,
      lastName,
      password
    );

    transaction.commit();
    return res.status(201).json({
      status: status.SUCCESS,
      message: "User create successfuly",
      user,
    });
  } catch (error) {
    transaction.rollback();
    return res.status(500).json({ status: status.FAILED, error });
  }
};

module.exports = { login, register };
