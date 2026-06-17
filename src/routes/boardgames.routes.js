const { Router } = require('express');

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
 *    summary: Obtiene todos los juegos de mesa
 *    responses:
 *      200:
 *        description: Muestra los primeros 15 juegos de mesa devueltos con éxito.
 *      404:
 *        description: No se encontraron juegos de mesa.
 */
router.get('/', getBoardgamesController);

router.get('/search', validateBoardgameSearchQuery, getBoardgameByQueryController);

router.get('/:id', validateBoardgameId, getBoardgameByIdController);

router.post('/', validateBoardgameData, createBoardgameController);

router.put('/:id', validateBoardgameId, validateBoardgameData, updateBoardgameController);

router.delete('/:id', validateBoardgameId, deleteBoardgameController);

router.patch('/:id/restore', validateBoardgameId, restoreBoardgameController);

module.exports = router;