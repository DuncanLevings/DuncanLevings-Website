/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

"use strict";

var express = require('express');
const passport = require('passport');
const auth = require("../auth");
const ***REMOVED*** ACCESS_TOKEN_TTL, REMEMBER_TOKEN_TTL ***REMOVED*** = require("../../consts");
const userService = require("../../service/userService");
const utils = require("../../service/utils");
var router = express.Router();

// returns user as well as checking if the user has valid access_token
router.get("/", auth.user, (req, res) => ***REMOVED***
  if (!req.user) return res.status(422).send("User not found");

  userService
    .getUser(req.user.id)
    .then(user => res.status(200).send(user))
    .catch(err => res.status(400).send(err.message));
***REMOVED***);

router.post("/register", (req, res) => ***REMOVED***
  userService
    .registerUser(req.body.email, req.body.username, req.body.password)
    .then(user => res.status(200).send(user))
    .catch(err => res.status(422).json(err.message));
***REMOVED***);

router.post("/login", (req, res) => ***REMOVED***
  if (!req.body.email)
    return res.status(422).json("Email is required!")

  if (!req.body.password)
    return res.status(422).json("Password is required!")

  passport.authenticate("local",
    ***REMOVED*** session: false ***REMOVED***,
    (err, user, info) => ***REMOVED***
      if (err) return res.status(422).json(err);
      if (!user)
        return res.status(422).json("email or password is incorrect!");

      req.logIn(user, err => ***REMOVED***
        if (err) return res.status(422).json(err);

        const token = user.generateJWT();

        res.cookie('access_token', token, ***REMOVED***
          maxAge: ACCESS_TOKEN_TTL,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production' ? true : false,
          sameSite: true,
        ***REMOVED***);
        
        if (req.body.remember_me) ***REMOVED***
          const token = utils.randomString(64);
          userService.saveRememberMeToken(token, user._id, err => ***REMOVED***
            if (err) return res.status(400).send(err);
            res.cookie("remember_me", token, ***REMOVED***
              path: "/",
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production' ? true : false,
              sameSite: true,
              maxAge: REMEMBER_TOKEN_TTL
            ***REMOVED***);
          ***REMOVED***);
        ***REMOVED***
        
        return res.json(***REMOVED*** user: user.toAuthJSON() ***REMOVED***);
      ***REMOVED***);
    ***REMOVED***)(req, res);
***REMOVED***);

router.get("/logout", (req, res) => ***REMOVED***
  userService.clearOldToken(req.cookies.remember_me);
  res.clearCookie("access_token");
  res.clearCookie("remember_me");
  req.logout();
  res.redirect("/")
***REMOVED***);

module.exports = router;
