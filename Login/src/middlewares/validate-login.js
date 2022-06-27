const validateLogin = (req, res, next) => {
  const { password, email } = req.body;

  if (!password) {
    return res.status(403).json({ message: 'Password is required!' })
  }

  if (!email) {
    return res.status(403).json({ message: 'Email is required!' })
  }

  next();
};

module.exports = {validateLogin};
