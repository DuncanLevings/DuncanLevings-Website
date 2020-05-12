/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

"use strict";

const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const RememberMeStrategy = require("passport-remember-me").Strategy;
const userService = require("../service/userService");
const utils = require("../service/utils");

passport.use(new LocalStrategy(***REMOVED***
    usernameField: "email",
    passwordField: "password",
***REMOVED***, userService.authenticate));

passport.use(new RememberMeStrategy(
    function(token, done) ***REMOVED***
        userService.consumeRememberMeToken(token, function (err, uid) ***REMOVED***
            if (err) ***REMOVED*** return done(err); ***REMOVED***
            if (!uid) ***REMOVED*** return done(null, false); ***REMOVED***
            return done(null, uid);
        ***REMOVED***);
    ***REMOVED***,
    function(uid, done) ***REMOVED***
        var token = utils.randomString(64);
        userService.saveRememberMeToken(token, uid, function (err) ***REMOVED***
            if (err) ***REMOVED*** return done(err); ***REMOVED***
            return done(null, token);
        ***REMOVED***);
    ***REMOVED***
));


passport.serializeUser(userService.serializeUser);

passport.deserializeUser(userService.deserializeUser);