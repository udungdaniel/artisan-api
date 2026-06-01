const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Artisan Service API',
      version: '1.0.0',
      description:
        'API for managing artisans and bookings with OAuth authentication'
    },
    servers: [
      {
        url: 'https://artisan-api-l6ei.onrender.com',
        description: 'Render Production Server'
      }
    ],
    components: {
      securitySchemes: {
        oauth2: {
          type: 'oauth2',
          description: 'GitHub OAuth Login'
        }
      }
    }
  },

  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;