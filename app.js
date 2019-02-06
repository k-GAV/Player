const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const status = require('http-status');

// eslint-disable-next-line no-unused-vars
const db = require('./db/db');
const trackRouter = require('./routes/track');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/track', trackRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(status.NOT_FOUND));
});

// Error handler
app.use((err, req, res) => {
  const { message } = err;

  // Set locals, only providing error in development
  res.locals.message = message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || status.INTERNAL_SERVER_ERROR).send(message);
});

module.exports = app;
