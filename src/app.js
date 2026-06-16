const express = require('express');
const cors = require('cors');

const boardgamesRoutes = require('./routes/boardgames.routes');
const favoritesRoutes = require('./routes/favorites.routes');
const healthRoutes = require('./routes/health.routes');
const userRoutes = require('./routes/user.routes');
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

const app = express();
app.use(cors());

app.use(express.json());
app.use('/api', healthRoutes);
app.use('/api/user', userRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/boardgames', boardgamesRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
