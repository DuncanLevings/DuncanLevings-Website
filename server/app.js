/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

"use strict";

var createError = require('http-errors');
var express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);
const ***REMOVED*** secret, sessionName, accessCookie ***REMOVED*** = require("./config.json");
const ***REMOVED*** CONNECT_TTL ***REMOVED*** = require("./consts");
require("./config/mongo");
// require("./config/redis");
require("./config/passport");

var app = express();

var sessionOptions = ***REMOVED***
  name: sessionName,
  secret: secret,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  store: new MongoStore(***REMOVED*** mongooseConnection: mongoose.connection ***REMOVED***),
  cookie: ***REMOVED*** 
    httpOnly: true, 
    maxAge: CONNECT_TTL 
  ***REMOVED***,
  unset: 'destroy'
***REMOVED***

if (process.env.PRODUCTION || process.env.DEVELOPMENT) ***REMOVED***
  app.enable('trust proxy');
  sessionOptions.cookie.secure = true
***REMOVED***

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded(***REMOVED*** extended: false ***REMOVED***));
app.use(cookieParser());
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('remember-me'));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => ***REMOVED***
  if (!req.cookies[sessionName] && !req.user) ***REMOVED***
    res.clearCookie(sessionName);
    res.clearCookie(accessCookie);      
  ***REMOVED***
  next();
***REMOVED***);

app.use(require('./routes'));

// must be last router
app.use(express.static(path.join(__dirname, 'client/build')));
app.get("*", (req, res) => ***REMOVED***
  res.sendFile(path.join(__dirname, "client/build/index.html"));
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
