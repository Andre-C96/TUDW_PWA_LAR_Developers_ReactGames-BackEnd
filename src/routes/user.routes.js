const { Router } = require('express');

const { getAll, createUser, getProfile, updateProfile, deleteUser } = require('../controllers/user.controller');
const { validateRegistration, validateIdParam } = require('../validations/user.validation');
const router = Router();

router.get("/", getAll);
router.post("/newUser", validateRegistration, createUser); // Pasa a auth como register cuando se implemente autenticación
router.post("/login", getProfile);
router.put("/profile/:id", validateIdParam, updateProfile);
router.delete("/:id", validateIdParam, deleteUser);

module.exports = router;