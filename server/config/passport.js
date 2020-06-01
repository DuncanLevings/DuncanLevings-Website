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

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
}, userService.authenticate));

passport.use(new RememberMeStrategy(
    function(token, done) {
        userService.consumeRememberMeToken(token, function (err, uid) {
            if (err) { return done(err); }
            if (!uid) { return done(null, false); }
            return done(null, uid);
        });
    },
    function(uid, done) {
        var token = utils.randomString(64);
        userService.saveRememberMeToken(token, uid, function (err) {
            if (err) { return done(err); }
            return done(null, token);
        });
    }
));


passport.serializeUser(userService.serializeUser);

passport.deserializeUser(userService.deserializeUser);