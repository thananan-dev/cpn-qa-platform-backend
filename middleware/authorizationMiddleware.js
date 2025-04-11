const status = require("../constants/status");
const handleAuthorizationUtils = require("../utils/handleAuthorizationUtils");

const authorization = (req, res, next) => {
  try {
    const {
      originalUrl,
      headers: { authorization },
    } = req;
    console.log({ originalUrl, authorization });

    if (!authorization) {
      return res.status(401).json({
        status: status.FAILED,
        message: "Header authorization is required",
      });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ status: status.FAILED, message: "Token is required" });
    }

    const decode = handleAuthorizationUtils.validateToken(token);
    // should validate more before next()
    next();
  } catch (error) {
    return res.status(500).json({ status: status.FAILED, error });
  }
};

module.exports = { authorization };
