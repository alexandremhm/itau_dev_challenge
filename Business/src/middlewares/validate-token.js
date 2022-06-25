const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  const secret = process.env.SECRET;

  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    jwt.verify(token, secret, jwtConfig);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
}
};

module.exports = {verifyToken}
