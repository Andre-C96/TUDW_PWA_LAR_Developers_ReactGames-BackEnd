const validateCreateFavorite = (req, res, next) => {
  const errors = [];

  if (req.body == null || typeof req.body !== 'object' || Array.isArray(req.body)) {
    return res.status(400).json({
      error: 'Invalid data',
      details: [{ field: 'body', message: 'The body must be a JSON object' }],
    });
  }

  const { boardgameId } = req.body;

  if (boardgameId === undefined || boardgameId === null || boardgameId === '') {
    errors.push({ field: 'boardgameId', message: 'The boardgameId is required' });
  }  else if (!Number.isInteger(Number(boardgameId)) || Number(boardgameId) <= 0) {
    errors.push({ field: 'boardgameId', message: 'The boardgameId must be a valid positive integer' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Invalid data',
      details: errors,
    });
  }

  next();
};

module.exports = {
  validateCreateFavorite,
  validateFavoriteIdParam: (req, res, next) => {
    const favoriteId = Number(req.params.id);

    if (!Number.isInteger(favoriteId) || favoriteId <= 0) {
      return res.status(400).json({
        error: 'Invalid data',
        details: [{ field: 'id', message: 'The id must be a valid positive integer' }],
      });
    }

    next();
  },
};