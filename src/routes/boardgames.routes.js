const { Router } = require('express');
const { authenticate, authorizeAdmin} = require('../middlewares/auth');

const {
    getBoardgamesController,
    getBoardgameByIdController,
    createBoardgameController,
    updateBoardgameController,
    deleteBoardgameController,
    restoreBoardgameController,
    getBoardgameByQueryController
} = require('../controllers/boardgames.controller');

const {
    validateBoardgameData,
    validateBoardgameId,
    validateBoardgameSearchQuery
} = require('../validations/boardgames.validation');

const router = Router();

/**
 * @openapi
 * /boardgames:
 *  get:
 *    tags:
 *      - Boardgame
 *    summary: Obtiene todos los juegos de mesa
 *    responses:
 *      200:
 *       description: Muestra los primeros 15 juegos de mesa devueltos con éxito.
 *      404:
 *       description: No se encontraron juegos de mesa.
 */
router.get('/', getBoardgamesController);


/**
 * @openapi
 * /boardgames/search:
 *  get:
 *    tags:
 *      - Boardgame
 *    summary: Obtiene juegos juegos de mesa por nombre o categoría que oincidan con la consulta de búsqueda
 *    responses:
 *      200:
 *       description: Muestra los primeros 15 juegos de mesa devueltos con éxito.
 *      404:
 *       description: No se encontraron juegos de mesa.
 */
router.get('/search', validateBoardgameSearchQuery, getBoardgameByQueryController);



router.get('/:id', validateBoardgameId, getBoardgameByIdController);

router.post('/', authenticate, authorizeAdmin, validateBoardgameData, createBoardgameController);

router.put('/:id', authenticate, authorizeAdmin, validateBoardgameId, validateBoardgameData, updateBoardgameController);

router.delete('/:id', authenticate, authorizeAdmin, validateBoardgameId, deleteBoardgameController);

router.patch('/:id/restore', authenticate, authorizeAdmin, validateBoardgameId, restoreBoardgameController);

module.exports = router;