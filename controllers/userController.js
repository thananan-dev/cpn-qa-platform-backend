const userServices = require("../services/userServices");

const status = require("../constants/status");

const getAllUsers = async (_, res) => {
  try {
    const users = await userServices.getAllUsers();

    if (!users) {
      return res.status(404).json({
        status: status.FAILED,
        messages: "Users not found",
      });
    }

    return res.status(200).json({ status: status.SUCCESS, users });
  } catch (error) {
    return res.status(500).json({ status: status.FAILED, error });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userServices.getUserById(id)

    if (!user) {
      return res.status(404).json({
        status: status.FAILED,
        messages: "User not found",
      });
    }

    return res.status(200).json({ status: status.SUCCESS, user });
  } catch (error) {
    return res.status(500).json({ status: status.FAILED, error });
  }
};

// Move this to registration

// const createUser = async (req, res) => {
//   const transaction = await sequelize.transaction();
//   try {
//     const { username, firstName, lastName, password } = req.body;

//     if (
//       handleRequestUtils.handleRequestInvalidBody(
//         username,
//         firstName,
//         lastName,
//         password
//       )
//     ) {
//       return res
//         .status(400)
//         .json({ status: status.FAILED, message: messages.InvalidRequest });
//     }

//     const user = await userServices.createUser(
//       username,
//       firstName,
//       lastName,
//       password
//     );

//     transaction.commit();
//     return res.status(200).json({
//       status: status.SUCCESS,
//       message: "User create successfuly",
//       user,
//     });
//   } catch (error) {
//     transaction.rollback();
//     return res.status(500).json({ status: status.FAILED, error });
//   }
// };

module.exports = { getAllUsers, getUserById };
