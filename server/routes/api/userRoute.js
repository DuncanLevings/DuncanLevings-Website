/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

"use strict";

var express = require('express');
const passport = require('passport');
const auth = require("../auth");
const { accessCookie, rememberCookie } = require("../../config/config.json");
const { ACCESS_TOKEN_TTL, REMEMBER_TOKEN_TTL } = require("../../constants/config_consts");
const { USER_ROUTES } = require("../../constants/route_consts/user_route_consts");
const userService = require("../../service/userService");
const utils = require("../../service/utils");
var router = express.Router();

// returns user as well as checking if the user has valid access_token
router.get(USER_ROUTES.ROOT, auth.user, (req, res) => {
  if (!req.user) return res.status(400).send("Login required!");

  userService
    .getUser(req.user.id)
    .then(user => res.status(200).send(user))
    .catch(err => res.status(400).send(err.message));
});

router.post(USER_ROUTES.REGISTER, (req, res) => {
  userService
    .registerUser(req.body.email, req.body.username, req.body.password)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(400).json(err.message));
});

router.post(USER_ROUTES.LOGIN, (req, res) => {
  if (!req.body.email)
    return res.status(400).json("Email is required!")

  if (!req.body.password)
    return res.status(400).json("Password is required!")

  passport.authenticate("local",
    (err, user, info) => {
      if (err) return res.status(400).json(err);
      if (!user)
        return res.status(400).json("email or password is incorrect!");

      req.logIn(user, err => {
        if (err) return res.status(400).json(err);

        const token = user.generateJWT();

        _generateCookie(res, accessCookie, token, ACCESS_TOKEN_TTL);
        _clearRememberMe(req, res);

        if (req.body.remember_me) {
          const token = utils.randomString(64);
          userService.saveRememberMeToken(token, user._id, err => {
            if (err) return res.status(400).send(err);
            _generateCookie(res, rememberCookie, token, REMEMBER_TOKEN_TTL);
          });
        }
        
        return res.json({ user: user.toAuthJSON() });
      });
    })(req, res);
});

router.get(USER_ROUTES.LOGOUT, (req, res) => {
  _clearRememberMe(req, res);
  res.clearCookie(accessCookie);
  req.session.destroy();
  req.logout();
  res.sendStatus(200);
});

router.get(USER_ROUTES.REFRESH_TOKEN, (req, res) => {
  const remember_me = req.cookies[rememberCookie];
  if (remember_me) {
    userService
      .getUserByToken(remember_me)
      .then((user) => {
        const token = user.generateJWT();
        _generateCookie(res, accessCookie, token, ACCESS_TOKEN_TTL);
        res.status(200).send("access refreshed");
      })
      .catch((err) => res.status(400).send(err));
  } else {
    res.status(400).send("No remember me token!");
  }
});

const _generateCookie = (res, cookie, data, maxAge) => {
  res.cookie(cookie, data, {
    maxAge: maxAge,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: true
  });
}

const _clearRememberMe = (req, res) => {
  if (req.cookies[rememberCookie]) {
    userService.clearOldToken(req.cookies[rememberCookie]);
    res.clearCookie(rememberCookie);
  }
}

module.exports = router;
