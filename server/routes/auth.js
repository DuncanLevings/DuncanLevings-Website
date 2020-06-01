/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

const jwt = require('jsonwebtoken');
const _config = require('../config/config.json');
const { AUTH_ERROR } = require('../consts/error_jsons');

const checkAccess = (isAdmin = false) => {
  return (req, res, next) => {
    const token = req.cookies[_config.accessCookie];
    if (!token) {
      return res.status(401).send(AUTH_ERROR);
    } else {
      jwt.verify(token, _config.secret, function (err, decoded) {
        // console.log(decoded)

        if (isAdmin)
          if (!decoded.isAdmin) {
            return res.status(403).send(AUTH_ERROR);
          }
        
        if (decoded.exp <= Date.now() / 1000) {
          res.clearCookie(_config.accessCookie);
          return res.status(401).send(AUTH_ERROR);
        }
        
        //check expire
        if (err) {
          res.clearCookie(_config.accessCookie);
          return res.status(401).send(AUTH_ERROR);
        } else {
          return next();
        }
      });
    }
  };
}

const auth = {
  admin: checkAccess(true),
  user: checkAccess()
}

module.exports = auth;