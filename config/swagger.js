const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Boardgames API',
      version: '1.0.0',
      description: 'Documentación de la API para la gestión de juegos de mesa y favoritos',
    },
    servers: [
      {
        url: 'https://tudw-pwa-lar-developers-react-games.vercel.app/api',
        description: 'Servidor Local',
      },
    ],
  },
  apis: ['./src/routes/*.routes.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;