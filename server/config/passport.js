/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

"use strict";

const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const ***REMOVED*** User ***REMOVED*** = require("./mongo");

passport.use(new LocalStrategy(***REMOVED***
    usernameField: "name",
    passwordField: "password",
***REMOVED***, (name, password, cb) => ***REMOVED***
    User.findOne(***REMOVED*** name ***REMOVED***)
        .then((user) => ***REMOVED***
            if (!user) return cb(null, false);
            user.validatePassword(password, (err, valid) => ***REMOVED***
                if (valid) return cb(null, user);
                return cb(***REMOVED*** errors: "name or password is incorrect!" ***REMOVED***, false);
            ***REMOVED***);
        ***REMOVED***).catch(cb);
***REMOVED***));

passport.serializeUser((user, cb) => ***REMOVED***
    cb(null, user);
***REMOVED***);

passport.deserializeUser((id, cb) => ***REMOVED***
    User.findById(id, (err, user) => ***REMOVED***
        cb(err, user);
    ***REMOVED***)
***REMOVED***);