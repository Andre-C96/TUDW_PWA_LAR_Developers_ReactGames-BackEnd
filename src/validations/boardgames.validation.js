const validateBoardgameData = (req, res, next) => {
    if (req.body == null || typeof req.body !== 'object' || Array.isArray(req.body)) {
        return res.status(400).json({
            success: false,
            message: 'The request body must be a JSON object.'
        });
    }

    const { imageURL, translations } = req.body;
    // Imagen 
    if (!imageURL || typeof imageURL !== 'string' || imageURL.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'The imageURL field is required and must be a valid string.'
        });
    }

    // Traducciones en array
    if (!translations || !Array.isArray(translations) || translations.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'You must include at least one translation as an array.'
        });
    }

    // Traduccion contenido
    for (let i = 0; i < translations.length; i++) {
        const t = translations[i];

        if (!t || typeof t !== 'object' || Array.isArray(t)) {
            return res.status(400).json({
                success: false,
                message: `Each translation must be a valid object. Error in translation number ${i + 1}.`
            });
        }

        if (!t.language || typeof t.language !== 'string' || t.language.trim() === '') {
            return res.status(400).json({ success: false, message: `The language field is missing in translation number ${i + 1}.` });
        }
        if (!t.name || typeof t.name !== 'string' || t.name.trim() === '') {
            return res.status(400).json({ success: false, message: `The name field is missing in translation number ${i + 1}.` });
        }
        if (!t.description || typeof t.description !== 'string' || t.description.trim() === '') {
            return res.status(400).json({ success: false, message: `The description field is missing in translation number ${i + 1}.` });
        }
        // Category en array
         if (!Array.isArray(t.category) || t.category.length === 0 || t.category.some((c) => typeof c !== 'string' || c.trim() === '')) {
            return res.status(400).json({ success: false, message: `The category field must be an array of non-empty strings with at least one item in translation number ${i + 1}.` });
        }
    }

    next();
};

// ID
const validateBoardgameId = (req, res, next) => {
    const { id } = req.params;

    const boardgameId = Number(id);

    if (!id || !Number.isInteger(boardgameId) || boardgameId <= 0) {
        return res.status(400).json({
            success: false,
            message: 'The ID provided in the URL is not valid. It must be a positive integer.'
        });
    }

    next();
};

module.exports = { validateBoardgameData, validateBoardgameId };