const validateRegisterData = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || email.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'El email es obligatorio',
    });
  }

  if (!password || password.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'La contraseña es obligatoria',
    });
  }

  next();
};

const validateLoginData = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email y contraseña son obligatorios para ingresar',
    });
  }

  next();
};

const validateRefreshData = (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken || refreshToken.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'El Refresh Token es obligatorio',
    });
  }

  next();
};

module.exports = {
  validateRegisterData,
  validateLoginData,
  validateRefreshData, 
};