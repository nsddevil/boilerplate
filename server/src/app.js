require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./models');
const routes = require('./routes');
const morgan = require('morgan');
const passport = require('passport');
const passportConfig = require('./passport');

const { PORT, COOKIE_SECRET } = process.env;

connectDB();
const app = express();

app.use(morgan('dev'));
app.use(cookieParser(COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
passportConfig();

app.use('/api', routes);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} No route`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message,
  });
});

app.listen(PORT, () => console.log('server start Port', PORT));
