const { validateEmail } = require("./common.validation");
const validateRegistration = (req, res, next) => {
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid user data format.'
    });
  }
  const emailResult = validateEmail(req.body.email);
  if (!emailResult.success) {
    return res.status(emailResult.status).json(emailResult);
  }
  next();
};

const validateIdParam = (req, res, next) => {
  const userId = Number(req.params.id);
  if (!req.params.id || !Number.isInteger(userId) || userId <= 0) {
    return res.status(400).json({
      success: false,
      message: 'The id parameter must be a positive integer.'
    });
  }
  next();
}

module.exports = {
  validateRegistration,
  validateIdParam
};