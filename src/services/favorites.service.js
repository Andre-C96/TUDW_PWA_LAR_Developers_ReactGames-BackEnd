const prisma = require('../prisma/prisma');

const DEFAULT_LANGUAGE = 'es';
const DEFAULT_USER_ID = 1;

const selectLocalizedTranslation = (translations, language) => {
  if (!Array.isArray(translations) || translations.length === 0) {
    return null;
  }

  return (
    translations.find((translation) => translation.language === language) ||
    translations[0]
  );
};

const formatFavorite = (favorite, language) => {
  const selectedLanguage = language || DEFAULT_LANGUAGE;
  const translation = selectLocalizedTranslation(
    favorite.boardgame.boardgameTranslations,
    selectedLanguage,
  );

  return {
    id: favorite.id,
    userId: favorite.userId,
    boardgameId: favorite.boardgameId,
    createdAt: favorite.createdAt,
    updatedAt: favorite.updatedAt,
    user: favorite.user,
    boardgame: {
      id: favorite.boardgame.id,
      imageURL: favorite.boardgame.imageURL,
      createdAt: favorite.boardgame.createdAt,
      updatedAt: favorite.boardgame.updatedAt,
      translation,
    },
  };
};

const getFavoritesService = async (language = DEFAULT_LANGUAGE) => {
  const favorites = await prisma.favorite.findMany({
    where: {
      userId: DEFAULT_USER_ID,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
      boardgame: {
        include: {
          boardgameTranslations: true,
        },
      },
    },
  });

  return favorites.map((favorite) => formatFavorite(favorite, language));
};

const getFavoriteByIdService = async (id, language = DEFAULT_LANGUAGE) => {
  const favorite = await prisma.favorite.findFirst({
    where: {
      id: Number(id),
      userId: DEFAULT_USER_ID,
    },
    include: {
      user: true,
      boardgame: {
        include: {
          boardgameTranslations: true,
        },
      },
    },
  });

  if (!favorite) {
    const error = new Error('Recurso no encontrado');
    error.status = 404;
    throw error;
  }

  return formatFavorite(favorite, language);
};

const createFavoriteService = async (data) => {
  const userId = DEFAULT_USER_ID;
  const boardgameId = Number(data.boardgameId);

  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!existingUser) {
    const error = new Error('El usuario no existe');
    error.status = 404;
    throw error;
  }

  const existingBoardgame = await prisma.boardgame.findUnique({
    where: { id: boardgameId },
    select: { id: true },
  });

  if (!existingBoardgame) {
    const error = new Error('El boardgame no existe');
    error.status = 404;
    throw error;
  }

  const existingFavorite = await prisma.favorite.findUnique({
    where: {
      userId_boardgameId: {
        userId,
        boardgameId,
      },
    },
  });

  if (existingFavorite) {
    const error = new Error('El favorito ya existe');
    error.status = 409;
    throw error;
  }

  return prisma.favorite.create({
    data: {
      userId,
      boardgameId,
    },
    include: {
      user: true,
      boardgame: true,
    },
  });
};

const deleteFavoriteService = async (id, language = DEFAULT_LANGUAGE) => {
  const favorite = await prisma.favorite.findFirst({
    where: {
      id: Number(id),
      userId: DEFAULT_USER_ID,
    },
    include: {
      user: true,
      boardgame: {
        include: {
          boardgameTranslations: true,
        },
      },
    },
  });

  if (!favorite) {
    const error = new Error('Recurso no encontrado');
    error.status = 404;
    throw error;
  }

  const deleted = await prisma.favorite.delete({
    where: { id: Number(id) },
    include: {
      user: true,
      boardgame: {
        include: {
          boardgameTranslations: true,
        },
      },
    },
  });

  return formatFavorite(deleted, language);
};

module.exports = {
  getFavoritesService,
  getFavoriteByIdService,
  createFavoriteService,
  deleteFavoriteService,
};
