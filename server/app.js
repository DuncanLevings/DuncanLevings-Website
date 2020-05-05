var createError = require('http-errors');
var express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoService = require("./service/mongoService");
const redisService = require("./service/redisService");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded(***REMOVED*** extended: false ***REMOVED***));
app.use(cookieParser());
app.use(
  session(***REMOVED***
    secret: "admin",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore(***REMOVED*** mongooseConnection: mongoose.connection ***REMOVED***)
  ***REMOVED***)
);

// app.use('/', indexRouter);
app.use('/users', usersRouter);

// must be last router
app.use(express.static(path.join(__dirname, 'client/build')));
app.get("*", (req, res) => ***REMOVED***
  res.sendfile(path.join(__dirname, "client/build/index.html"));
***REMOVED***);

// catch 404 and forward to error handler
app.use(function(req, res, next) ***REMOVED***
  next(createError(404));
***REMOVED***);

// error handler
app.use(function(err, req, res, next) ***REMOVED***
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : ***REMOVED******REMOVED***;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
***REMOVED***);

module.exports = app;
