/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const RememberMeStrategy = require('passport-remember-me').Strategy;
const { _userService, _utils } = require('../service');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, _userService.authenticate));

passport.use(new RememberMeStrategy(
    function(token, done) {
        _userService.consumeRememberMeToken(token, function (err, uid) {
            if (err) { return done(err); }
            if (!uid) { return done(null, false); }
            return done(null, uid);
        });
    },
    function(uid, done) {
        var token = _utils.randomString(64);
        _userService.saveRememberMeToken(token, uid, function (err) {
            if (err) { return done(err); }
            return done(null, token);
        });
    }
));


passport.serializeUser(_userService.serializeUser);

passport.deserializeUser(_userService.deserializeUser);