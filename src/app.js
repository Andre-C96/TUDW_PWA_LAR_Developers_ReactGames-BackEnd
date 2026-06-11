const express = require('express');

const healthRoutes = require('./routes/health.routes');
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

const app = express();

app.use(express.json());

app.use('/api', healthRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
