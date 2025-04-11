const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validatePassword = async (loginPassword, password) => {
  const result = await bcrypt.compare(loginPassword, password);
  return result;
};

const validateToken = (token, callback) => {
  return jwt.verify(token, process.env.JWT_PRIVATE_KEY, callback);
};

module.exports = { validatePassword, validateToken };
