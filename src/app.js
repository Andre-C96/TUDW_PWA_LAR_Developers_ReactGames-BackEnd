const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const boardgamesRoutes = require('./routes/boardgames.routes');
const favoritesRoutes = require('./routes/favorites.routes');
const healthRoutes = require('./routes/health.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

const options = require('../config/swagger');

const swaggerSpec = swaggerJsdoc(options);

const app = express();
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: "¡Bienvenido a la API de Boardgames! El backend está funcionando correctamente.",
    endpoints: {
      boardgames: "/api/boardgames",
      favorites: "/api/favorites",
      user: "/api/user",
      docs: "/api-docs"
    }
  });
});

app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/boardgames', boardgamesRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;