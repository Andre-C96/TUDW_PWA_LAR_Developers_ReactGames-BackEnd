const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({
      success: false,
      message: 'Token not provided or invalid format',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    
    const decoded = jwt.verify(token, authConfig.accessTokenSecret);
    req.user = decoded; 
    next();

  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Token invalid or expired',
    });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'Access denied: ADMIN role required',
    });
  }
  next();
};

module.exports = {
  authenticate,
  authorizeAdmin,
};