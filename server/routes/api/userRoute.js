/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

var express = require('express');
const passport = require('passport');
const auth = require('../auth');
const _config = require('../../config/config.json');
const { USER_ROUTES } = require('../../consts/route_consts');
const {
  USER_CLIENT_ERRORS,
  USER_SERVER_ERRORS,
  AUTH_ERROR } = require('../../consts/error_jsons');
const {
  ACCESS_TOKEN_TTL,
  REMEMBER_TOKEN_TTL } = require('../../consts/config_consts');
const { _userService, _utils } = require('../../service');
const router = express.Router();

// _userService.createRSToolsUser("5f9e5af77ee5133bb4e810bc");
// returns user as well as checking if the user has valid access_token
router.get(USER_ROUTES.USER_ROOT, auth.user, (req, res) => {
  if (!req.user) return res.status(400).send(USER_SERVER_ERRORS.LOGIN_REQUIRED);

  _userService
    .getUser(req.user.id)
    .then(user => res.status(200).send(user))
    .catch(err => res.status(400).send(err.message));
});

router.post(USER_ROUTES.REGISTER, (req, res) => {
  _userService
    .registerUser(req.body.email, req.body.username, req.body.password)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(400).json(err.message));
});

router.post(USER_ROUTES.LOGIN, (req, res) => {
  if (!req.body.email)
    return res.status(400).json(USER_SERVER_ERRORS.EMAIL_REQUIRED)

  if (!req.body.password)
    return res.status(400).json(USER_SERVER_ERRORS.PASSWORD_REQUIRED)

  passport.authenticate("local",
    (err, user, info) => {
      if (err) return res.status(400).json(err);
      if (!user)
        return res.status(400).json(USER_CLIENT_ERRORS.INCORRECT_LOGIN);

      req.logIn(user, err => {
        if (err) return res.status(400).json(err);

        const token = user.generateJWT();

        _generateCookie(res, _config.accessCookie, token, ACCESS_TOKEN_TTL);
        _clearRememberMe(req, res);

        if (req.body.remember_me) {
          const token = _utils.randomString(64);
          _userService.saveRememberMeToken(token, user._id, err => {
            if (err) return res.status(400).send(err);
            _generateCookie(res, _config.rememberCookie, token, REMEMBER_TOKEN_TTL);
          });
        }
        
        return res.json({ user: user.toAuthJSON() });
      });
    })(req, res);
});

router.get(USER_ROUTES.LOGOUT, (req, res) => {
  _clearRememberMe(req, res);
  res.clearCookie(_config.accessCookie);
  res.clearCookie(_config.sessionName);
  req.session.destroy();
  req.logout();
  res.sendStatus(200);
});

router.get(USER_ROUTES.REFRESH_TOKEN, (req, res) => {
  const remember_me = req.cookies[_config.rememberCookie];
  if (remember_me) {
    _userService
      .getUserByToken(remember_me)
      .then((user) => {
        const token = user.generateJWT();
        _generateCookie(res, _config.accessCookie, token, ACCESS_TOKEN_TTL);
        res.sendStatus(200);
      })
      .catch((err) => res.status(400).send(err));
  } else {
    res.status(400).send(AUTH_ERROR);
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
  if (req.cookies[_config.rememberCookie]) {
    _userService.clearOldToken(req.cookies[_config.rememberCookie]);
    res.clearCookie(_config.rememberCookie);
  }
}

module.exports = router;
