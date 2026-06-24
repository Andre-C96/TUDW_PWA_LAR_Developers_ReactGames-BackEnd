const { Router } = require('express');
const { getAll, createUser, getProfile, updateProfile, deleteUser } = require('../controllers/user.controller');
const { validateIdParam } = require('../validations/user.validation');
const { authenticate} = require('../middlewares/auth');

const router = Router();

router.get("/", authenticate, getAll);
router.get("/profile", authenticate, getProfile);
router.put("/profile/:id", authenticate, validateIdParam, updateProfile);
router.delete("/", authenticate, deleteUser);
module.exports = router;