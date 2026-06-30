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
        description: 'Vercel Deployment',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Ingresa tu token JWT con el formato: Bearer <token>',
        },
      },
    },
  },
  apis: ['./src/routes/*.routes.js', './routes/*.routes.js'],
};

module.exports = options;