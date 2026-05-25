const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/artisans', require('./routes/artisans'));
app.use('/bookings', require('./routes/bookings'));
app.get('/', (req, res) => {
  res.send('Artisan Service API is running...');
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});