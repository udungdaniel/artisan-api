const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const session = require('express-session');
const passport = require('passport');

const swaggerDocument = require('./swagger');

require('./config/passport');

dotenv.config();

const app = express();

app.use(express.json());

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Home Route
app.get('/', (req, res) => {
  res.send('Artisan Service API is running...');
});

// Login Route
app.get(
  '/login',
  passport.authenticate('github', {
    scope: ['user:email']
  })
);

// GitHub Callback Route
app.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/'
  }),
  (req, res) => {
    res.redirect('/api-docs');
  }
);

// Logout Route
app.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

// Current User Route (useful for testing authentication)
app.get('/profile', (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'Not authenticated'
    });
  }

  res.status(200).json(req.user);
});

// Swagger Documentation
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// API Routes
app.use('/artisans', require('./routes/artisans'));
app.use('/bookings', require('./routes/bookings'));

// Start Server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});