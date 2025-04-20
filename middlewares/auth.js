// middleware/auth.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'secretkey';

module.exports = function (req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.adminId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
