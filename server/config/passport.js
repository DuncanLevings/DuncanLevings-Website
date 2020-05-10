/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

"use strict"

const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const ***REMOVED*** User ***REMOVED*** = require("./mongo");

passport.use(new LocalStrategy(***REMOVED***
    usernameField: 'user[name]',
    passwordField: 'user[password]',
***REMOVED***, (name, password, cb) => ***REMOVED***
    User.findOne(***REMOVED*** name ***REMOVED***)
        .then((user) => ***REMOVED***
            if (!user || !user.validatePassword(password)) ***REMOVED***
                return cb(null, false, ***REMOVED*** errors: ***REMOVED*** 'name or password': 'is invalid' ***REMOVED*** ***REMOVED***);
            ***REMOVED***

            return cb(null, user);
        ***REMOVED***).catch(cb);
***REMOVED***));