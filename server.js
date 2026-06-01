const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger');

const session = require('express-session');
const passport = require('passport');

require('./config/passport');

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  '/login',
  passport.authenticate('github', { scope: ['user:email'] })
);

app.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/'
  }),
  (req, res) => {
    res.redirect('/api-docs');
  }
);

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

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