const {
  createFavoriteService,
  getFavoriteByIdService,
  getFavoritesService,
  deleteFavoriteService,
} = require('../services/favorites.service');

const DEFAULT_LANGUAGE = 'es';

const getLanguageFromQuery = (req) => req.query.language || DEFAULT_LANGUAGE;

const getFavoritesController = async (req, res) => {
  try {
    const favorites = await getFavoritesService(getLanguageFromQuery(req));

    return res.status(200).json({
      success: true,
      data: favorites,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      error: error.message || 'Internal server error',
    });
  }
};

const getFavoriteByIdController = async (req, res) => {
  try {
    const favorite = await getFavoriteByIdService(req.params.id, getLanguageFromQuery(req));

    return res.status(200).json({
      success: true,
      data: favorite,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      error: error.message || 'Internal server error',
    });
  }
};

const createFavoriteController = async (req, res) => {
  try {
    const favorite = await createFavoriteService(req.body);

    return res.status(201).json({
      success: true,
      message: 'Favorite created successfully',
      data: favorite,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      error: error.message || 'Internal server error',
    });
  }
};

const deleteFavoriteController = async (req, res) => {
  try {
    const favorite = await deleteFavoriteService(req.params.id, getLanguageFromQuery(req));

    return res.status(200).json({
      success: true,
      message: 'Favorite deleted successfully',
      data: favorite,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      error: error.message || 'Internal server error',
    });
  }
};

module.exports = {
  getFavoritesController,
  getFavoriteByIdController,
  createFavoriteController,
  deleteFavoriteController,
};