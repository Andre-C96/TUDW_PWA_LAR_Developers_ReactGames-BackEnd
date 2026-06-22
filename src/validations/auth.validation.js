const validateRegisterData = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || email.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'The email is required',
    });
  }

  if (!password || password.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'The password is required',
    });
  }

  next();
};

const validateLoginData = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required to log in',
    });
  }

  next();
};

const validateRefreshData = (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken || refreshToken.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'The Refresh Token is required',
    });
  }

  next();
};

module.exports = {
  validateRegisterData,
  validateLoginData,
  validateRefreshData, 
};