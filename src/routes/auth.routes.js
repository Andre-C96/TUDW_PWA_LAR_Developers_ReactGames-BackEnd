const { Router } = require('express');
const {
  registerController,
  loginController,
  refreshController,
  logoutController,
} = require('../controllers/auth.controller');
const {
  validateRegisterData,
  validateLoginData,
  validateRefreshData,
} = require('../validations/auth.validation');
const { authenticate } = require('../middlewares/auth.js');
const router = Router();

router.post('/register', validateRegisterData, registerController);
router.post('/login', validateLoginData, loginController);
router.post('/refresh', validateRefreshData, refreshController);
router.post('/logout', authenticate, logoutController);

module.exports = router;