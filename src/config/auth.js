module.exports = {
  accessTokenSecret: process.env.JWT_ACCESS_SECRET || "access-secret-dev-change-me",
  refreshTokenSecret: process.env.JWT_REFRESH_SECRET || "refresh-secret-dev-change-me",
  accessTokenExpiry: "15m",
  refreshTokenExpiry: "7d",
  bcryptSaltRounds: 10,
};