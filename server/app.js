const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const passport = require('passport');
const cors = require('cors');

const users = require('./routes/users');
const projects = require('./routes/projects');
const tasks = require('./routes/tasks');
const passportStrategy = require('./config/passport');

const app = express();

// Middleware
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());
passportStrategy(passport); 

// Routes 
app.use('/users', users);
app.use('/tasks', tasks);
app.use('/projects', projects);

// Error Handlers
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;