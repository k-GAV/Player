const createError = require('http-errors');

const express = require('express');

const path = require('path');

const cookieParser = require('cookie-parser');

const logger = require('morgan');

// eslint-disable-next-line no-unused-vars
const db = require('./db/db');

const indexRouter = require('./routes/index');

const usersRouter = require('./routes/users');

const app = express();

const codeNotFound = 404;
const codeInternalServerError = 500;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(codeNotFound));
});

// Error handler
app.use((err, req, res) => {
  const { message } = err;

  // Set locals, only providing error in development
  res.locals.message = message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || codeInternalServerError);
  res.render('error');
});

module.exports = app;
