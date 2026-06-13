const { Router } = require('express');

const { getAll, createUser, getProfile, updateProfile, deleteUser } = require('../controllers/user.controller');
const { validateRegistration, validateIdParam } = require('../validations/user.validation');
const router = Router();

router.get("/", getAll);
router.post("/", validateRegistration, createUser); // Pasa a auth como register cuando se implemente autenticación
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.delete("/:id", validateIdParam, deleteUser);

module.exports = router;