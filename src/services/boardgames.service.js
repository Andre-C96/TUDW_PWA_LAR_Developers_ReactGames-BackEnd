const prisma = require('../prisma/prisma');

const DEFAULT_LANGUAGE = 'es';

const selectLocalizedTranslation = (translations, language) => {
  if (!Array.isArray(translations) || translations.length === 0) {
    return null;
  }

  return (
    translations.find((translation) => translation.language === language) ||
    translations[0]
  );
};


const formatBoardgame = (boardgame, language) => {
  const selectedLanguage = language || DEFAULT_LANGUAGE;
  const translation = selectLocalizedTranslation(
    boardgame.boardgameTranslations,
    selectedLanguage,
  );

  return {
    id: boardgame.id,
    imageURL: boardgame.imageURL,
    createdAt: boardgame.createdAt,
    updatedAt: boardgame.updatedAt,
    deletedAt: boardgame.deletedAt,
    translation,
  };
};

// Obtener 
const getBoardgamesService = async (language = DEFAULT_LANGUAGE, page = 1, limit = 15) => {

  const skip = (page - 1) * limit;

  const [totalItems, boardgames] = await prisma.$transaction([
    prisma.boardgame.count({ where: { deletedAt: null } }),
    prisma.boardgame.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      skip: skip,
      take: limit,
      include: {
        boardgameTranslations: true,
      },
    }),
  ]);

  const totalPages = Math.ceil(totalItems / limit);
  const hasNextPage = page < totalPages;

  return {
    meta: {
      totalItems,
      currentPage: page,
      limit,
      hasNextPage,
    },
    data: boardgames.map((boardgame) => formatBoardgame(boardgame, language)),
  };
};

// Obtener por ID
const getBoardgameByIdService = async (id, language = DEFAULT_LANGUAGE) => {
  const boardgame = await prisma.boardgame.findFirst({
    where: {
      id: Number(id),
      deletedAt: null,
    },
    include: {
      boardgameTranslations: true,
    },
  });

  if (!boardgame) {
    const error = new Error('Resource not found');
    error.status = 404;
    throw error;
  }

  return formatBoardgame(boardgame, language);
};

// Crear
const createBoardgameService = async (data, language = DEFAULT_LANGUAGE) => {
  const newBoardgame = await prisma.boardgame.create({
    data: {
      imageURL: data.imageURL,
      boardgameTranslations: {
        create: data.translations,
      },
    },
    include: {
      boardgameTranslations: true,
    },
  });

  return formatBoardgame(newBoardgame, language);
};

// Actualizar
const updateBoardgameService = async (id, data, language = DEFAULT_LANGUAGE) => {
  const existingBoardgame = await prisma.boardgame.findFirst({
    where: {
      id: Number(id),
      deletedAt: null,
    },
  });

  if (!existingBoardgame) {
    const error = new Error('Resource not found');
    error.status = 404;
    throw error;
  }

  const updatedBoardgame = await prisma.boardgame.update({
    where: { id: Number(id) },
    data: {
      imageURL: data.imageURL,
      boardgameTranslations: {
        deleteMany: {},
        create: data.translations,
      },
    },
    include: {
      boardgameTranslations: true,
    },
  });

  return formatBoardgame(updatedBoardgame, language);
};

// Borrar
const deleteBoardgameService = async (id, language = DEFAULT_LANGUAGE) => {
  const boardgame = await prisma.boardgame.findFirst({
    where: {
      id: Number(id),
      deletedAt: null,
    },
    include: {
      boardgameTranslations: true,
    },
  });

  if (!boardgame) {
    const error = new Error('Resource not found');
    error.status = 404;
    throw error;
  }

  // Borrado lógico
  const deletedBoardgame = await prisma.boardgame.update({
    where: { id: Number(id) },
    data: {
      deletedAt: new Date(),
    },
    include: {
      boardgameTranslations: true,
    },
  });

  return formatBoardgame(deletedBoardgame, language);
};

// Restaurar
const restoreBoardgameService = async (id, language = DEFAULT_LANGUAGE) => {
  const boardgame = await prisma.boardgame.findUnique({
    where: { id: Number(id) }
  });

  if (!boardgame) {
    const error = new Error('Resource not found');
    error.status = 404;
    throw error;
  }

  if (!boardgame.deletedAt) {
    const error = new Error('The boardgame is already active');
    error.status = 400;
    throw error;
  }


  const restoredBoardgame = await prisma.boardgame.update({
    where: { id: Number(id) },
    data: {
      deletedAt: null
    },
    include: {
      boardgameTranslations: true
    }
  });

  return formatBoardgame(restoredBoardgame, language);
};

module.exports = {
  getBoardgamesService,
  getBoardgameByIdService,
  createBoardgameService,
  updateBoardgameService,
  deleteBoardgameService,
  restoreBoardgameService
};