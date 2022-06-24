const validateRequiredDataRegister = (req, res, next) => {
  const { name, password, email } = req.body;

  if (!name) {
    return res.status(403).json({ message: 'Name is required!' })
  }

  if (!password) {
    return res.status(403).json({ message: 'Password is required!' })
  }

  if (!email) {
    return res.status(403).json({ message: 'Email is required!' })
  }

  next();
};

module.exports = {validateRequiredDataRegister};
