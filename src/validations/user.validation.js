const validateRegistration = (req, res, next) => {
  const errors = [];
}

const validateIdParam = (req, res, next) => {
  const userId = Number(req.params.id);
}

module.exports = {
  validateRegistration,
  validateIdParam
};