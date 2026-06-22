const {
    getBoardgamesService,
    getBoardgameByIdService,
    createBoardgameService,
    updateBoardgameService,
    deleteBoardgameService,
    restoreBoardgameService,
    getBoardgameByQueryService
} = require('../services/boardgames.service');


const getBoardgamesController = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;

        const result = await getBoardgamesService(req.query.language, page, limit);

        return res.status(200).json({
            success: true,
            meta: result.meta,
            data: result.data,
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

const getBoardgameByQueryController = async (req, res) => { 
    try {
        const { query, language } = req.query; 

        const boardgames = await getBoardgameByQueryService(query, language);

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
            error: error.message || 'Internal server error',
        });
    }
};

module.exports = {
    getBoardgamesController,
    getBoardgameByIdController,
    createBoardgameController,
    updateBoardgameController,
    deleteBoardgameController,
    restoreBoardgameController,
    getBoardgameByQueryController
};
