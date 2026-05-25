const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger');

dotenv.config();

const app = express();

app.use(express.json());

// HOME ROUTE
app.get('/', (req, res) => {
  res.send('Artisan Service API is running...');
});

// SWAGGER ROUTE
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ROUTES
app.use('/artisans', require('./routes/artisans'));
app.use('/bookings', require('./routes/bookings'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});