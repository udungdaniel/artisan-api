const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Artisan Service API',
      version: '1.0.0',
      description: 'API for managing artisans and bookings'
    },
    servers: [
      {
        url: 'https://artisan-api-l6ei.onrender.com'
      }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;