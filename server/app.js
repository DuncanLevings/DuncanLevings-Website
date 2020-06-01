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
const { secret, sessionName, accessCookie } = require("./config/config.json");
const { CONNECT_TTL } = require("./constants/config_consts");
require("./config/mongo");
// require("./config/redis");
require("./config/passport");

var app = express();

var sessionOptions = {
  name: sessionName,
  secret: secret,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { 
    httpOnly: true, 
    maxAge: CONNECT_TTL 
  },
  unset: 'destroy'
}

if (process.env.PRODUCTION || process.env.DEVELOPMENT) {
  app.enable('trust proxy');
  sessionOptions.cookie.secure = true
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('remember-me'));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  if (!req.cookies[sessionName] && !req.user) {
    res.clearCookie(sessionName);
    res.clearCookie(accessCookie);      
  }
  next();
});

app.use(require('./routes'));

// must be last router
app.use(express.static(path.join(__dirname, 'client/build')));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
