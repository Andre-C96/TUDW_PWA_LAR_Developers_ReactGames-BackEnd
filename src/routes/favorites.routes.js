const { Router } = require('express');

const {
  createFavoriteController,
  getFavoriteByIdController,
  getFavoritesController,
} = require('../controllers/favorites.controller');
const {
  validateCreateFavorite,
  validateFavoriteIdParam,
} = require('../validations/favorites.validation');

const router = Router();

router.get('/', getFavoritesController);

router.get('/:id', validateFavoriteIdParam, getFavoriteByIdController);

router.post('/', validateCreateFavorite, createFavoriteController);

module.exports = router;