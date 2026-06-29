const { Router } = require('express');
const { getAll, createUser, getProfile, updateProfile, deleteUser } = require('../controllers/user.controller');
const { validateIdParam } = require('../validations/user.validation');
const { authenticate, authorizeAdmin} = require('../middlewares/auth');

const router = Router();

router.get("/", authenticate, getAll);
router.get("/profile", authenticate, getProfile);
router.put("/profile/:id", authenticate, authorizeAdmin, validateIdParam, updateProfile);
router.delete("/", authenticate, authorizeAdmin, deleteUser);
module.exports = router;