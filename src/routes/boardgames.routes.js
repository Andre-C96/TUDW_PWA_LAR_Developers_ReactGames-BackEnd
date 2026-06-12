const { Router } = require('express');

const {
    getBoardgamesController,
    getBoardgameByIdController,
    createBoardgameController,
    updateBoardgameController,
    deleteBoardgameController,
    restoreBoardgameController
} = require('../controllers/boardgames.controller');

const {
    validateBoardgameData,
    validateBoardgameId,
} = require('../validations/boardgames.validation');

const router = Router();

router.get('/', getBoardgamesController);
router.get('/:id', validateBoardgameId, getBoardgameByIdController);

router.post('/', validateBoardgameData, createBoardgameController);

router.put('/:id', validateBoardgameId, validateBoardgameData, updateBoardgameController);

router.delete('/:id', validateBoardgameId, deleteBoardgameController);

router.patch('/:id/restore', validateBoardgameId, restoreBoardgameController);

module.exports = router;