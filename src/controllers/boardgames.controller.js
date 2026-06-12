const {
    getBoardgamesService,
    getBoardgameByIdService,
    createBoardgameService,
    updateBoardgameService,
    deleteBoardgameService,
    restoreBoardgameService
} = require('../services/boardgames.service');


const getBoardgamesController = async (req, res) => {
    try {
        const boardgames = await getBoardgamesService(req.query.language);

        return res.status(200).json({
            success: true,
            data: boardgames,
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            error: error.message || 'Internal server error',
        });
    }
};

const getBoardgameByIdController = async (req, res) => {
    try {
        const boardgame = await getBoardgameByIdService(
            req.params.id,
            req.query.language
        );

        return res.status(200).json({
            success: true,
            data: boardgame,
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            error: error.message || 'Internal server error',
        });
    }
};

const createBoardgameController = async (req, res) => {
    try {
        const boardgame = await createBoardgameService(
            req.body,
            req.query.language
        );

        return res.status(201).json({
            success: true,
            message: 'Boardgame created successfully',
            data: boardgame,
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            error: error.message || 'Internal server error',
        });
    }
};

const updateBoardgameController = async (req, res) => {
    try {
        const boardgame = await updateBoardgameService(
            req.params.id,
            req.body,
            req.query.language
        );

        return res.status(200).json({
            success: true,
            message: 'Boardgame updated successfully',
            data: boardgame,
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            error: error.message || 'Internal server error',
        });
    }
};

const deleteBoardgameController = async (req, res) => {
    try {
        const boardgame = await deleteBoardgameService(
            req.params.id,
            req.query.language
        );

        return res.status(200).json({
            success: true,
            message: 'Boardgame deleted successfully',
            data: boardgame,
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            error: error.message || 'Internal server error',
        });
    }
};

const restoreBoardgameController = async (req, res) => {
    try {
        const boardgame = await restoreBoardgameService(
            req.params.id,
            req.query.language
        );

        return res.status(200).json({
            success: true,
            message: 'Boardgame restored successfully',
            data: boardgame,
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal server error',
        });
    }
};

module.exports = {
    getBoardgamesController,
    getBoardgameByIdController,
    createBoardgameController,
    updateBoardgameController,
    deleteBoardgameController,
    restoreBoardgameController
};
