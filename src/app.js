const express = require('express');

const favoritesRoutes = require('./routes/favorites.routes');
const healthRoutes = require('./routes/health.routes');

const app = express();

app.use(express.json());

app.use('/api', healthRoutes);
app.use('/api/favorites', favoritesRoutes);

module.exports = app;
