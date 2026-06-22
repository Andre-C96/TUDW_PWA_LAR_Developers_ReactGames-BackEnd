const {
  registerAuthService,
  loginAuthService,
  refreshAuthService,
  logoutAuthService,
} = require('../services/auth.service');

const registerController = async (req, res) => {
  try {
    const newUser = await registerAuthService(req.body);
    return res.status(201).json({
      success: true,
      message: 'User successfully registered',
      data: newUser,
    });
  } catch (error) {
    return res.status(error.status || 500).json({ success: false, message: error.message });
  }
};

const loginController = async (req, res) => {
  try {
    const loginData = await loginAuthService(req.body);
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: loginData, 
    });
  } catch (error) {
    return res.status(error.status || 500).json({ success: false, message: error.message });
  }
};

const refreshController = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({ success: false, message: 'Refresh token required' });
    }

    const tokens = await refreshAuthService(refreshToken);
    
    return res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: tokens,
    });
  } catch (error) {
    return res.status(error.status || 500).json({ success: false, message: error.message });
  }
};

const logoutController = async (req, res) => {
  try {
    
    const userId = req.user.id;
    
    await logoutAuthService(userId);
    
    return res.status(200).json({
      success: true,
      message: 'Session closed successfully',
    });
  } catch (error) {
    return res.status(error.status || 500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerController,
  loginController,
  refreshController,
  logoutController,
};