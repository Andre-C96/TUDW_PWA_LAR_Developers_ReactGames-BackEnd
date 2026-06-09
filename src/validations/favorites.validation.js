const validateCreateFavorite = (req, res, next) => {
  const errors = [];

  if (req.body == null || typeof req.body !== 'object' || Array.isArray(req.body)) {
    return res.status(400).json({
      error: 'Datos inválidos',
      details: [{ field: 'body', message: 'El body no puede estar vacío' }],
    });
  }

  const { boardgameId } = req.body;

  if (boardgameId === undefined || boardgameId === null || boardgameId === '') {
    errors.push({ field: 'boardgameId', message: 'El boardgameId es obligatorio' });
  } else if (!Number.isInteger(Number(boardgameId))) {
    errors.push({ field: 'boardgameId', message: 'El boardgameId debe ser un número entero válido' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Datos inválidos',
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
        error: 'Datos inválidos',
        details: [{ field: 'id', message: 'El id debe ser un número entero válido' }],
      });
    }

    next();
  },
};