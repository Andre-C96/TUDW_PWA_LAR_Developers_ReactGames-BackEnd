export const errorHandlerMiddleware = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    const statusCode = err.statusCode || err.status || 500;

    const errorMessage = err.message || 'Internal server error';

    res.status(statusCode).json({
        success: false,
        message: errorMessage
    });
};