const prisma = require('../prisma/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth'); 

const registerAuthService = async (userData) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });

  if (existingUser) {
    const error = new Error('The email is already registered');
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(userData.password, authConfig.bcryptSaltRounds);

  const newUser = await prisma.user.create({
    data: {
      email: userData.email,
      password: hashedPassword,
      role: userData.role || 'USUARIO',
    },
  });

  return {
    id: newUser.id,
    email: newUser.email,
    role: newUser.role,
  };
};

const loginAuthService = async (credentials) => {
  const user = await prisma.user.findUnique({
    where: { email: credentials.email, deletedAt: null },
  });

  if (!user) {
    const error = new Error('Invalid credentials');
    error.status = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

  if (!isPasswordValid) {
    const error = new Error('Invalid credentials');
    error.status = 401;
    throw error;
  }

  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    authConfig.accessTokenSecret,
    { expiresIn: authConfig.accessTokenExpiry || '60m' }
  );

  const refreshToken = jwt.sign(
    { id: user.id }, 
    authConfig.refreshTokenSecret,
    { expiresIn: authConfig.refreshTokenExpiry || '7d' }
  );

  // RefreshToken en BD
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: refreshToken },
  });

  return {
    user: { id: user.id, email: user.email, role: user.role },
    accessToken,
    refreshToken,
  };
};

const refreshAuthService = async (oldRefreshToken) => {
  try {
    
    const decoded = jwt.verify(oldRefreshToken, authConfig.refreshTokenSecret);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id, deletedAt: null },
    });

    if (!user || user.refreshToken !== oldRefreshToken) {
      throw new Error();
    }

    const newAccessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      authConfig.accessTokenSecret,
      { expiresIn: authConfig.accessTokenExpiry }
    );

    return { accessToken: newAccessToken };
  } catch (err) {
    const error = new Error('Refresh token invalid or expired');
    error.status = 403; 
    throw error;
  }
};

const logoutAuthService = async (userId) => {
  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null },
  });
  
  return true;
};

module.exports = {
  registerAuthService,
  loginAuthService,
  refreshAuthService,
  logoutAuthService,
};