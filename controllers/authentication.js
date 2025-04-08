const login = (req, res) => {
  return res.status(200).json({ message: "login success" });
};

module.exports = { login };
