const { Router } = require('express');

const {
  createFavoriteController,
  getFavoriteByIdController,
  getFavoritesController,
  deleteFavoriteController,
} = require('../controllers/favorites.controller');
const {
  validateCreateFavorite,
  validateFavoriteIdParam,
} = require('../validations/favorites.validation');
const { authenticate } = require('../middlewares/auth');

const router = Router();

router.get('/', authenticate, getFavoritesController);

router.get('/:id', authenticate, validateFavoriteIdParam, getFavoriteByIdController);

router.post('/', authenticate, validateCreateFavorite, createFavoriteController);

router.delete('/:id', authenticate, validateFavoriteIdParam, deleteFavoriteController);

module.exports = router;