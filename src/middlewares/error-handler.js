function errorHandlerMiddleware(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    const statusCode = err.statusCode || err.status || 500;

    res.status(statusCode).json({
        message: err.message || 'Internal server error'
    });
}

module.exports = errorHandlerMiddleware;