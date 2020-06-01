/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

const jwt = require('jsonwebtoken');
const { secret } = require("../config/config.json");

const checkAccess = (isAdmin = false) => {
  return (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.sendStatus(401);
    } else {
      jwt.verify(token, secret, function (err, decoded) {
        // console.log(decoded)

        if (isAdmin)
          if (!decoded.isAdmin) {
            return res.status(403).send("Required admin privilege to access!");
          }
        
        if (decoded.exp <= Date.now() / 1000) {
          res.clearCookie("access_token");
          return res.status(401).send("Unauthorized: Token has expired!");
        }
        
        //check expire
        if (err) {
          res.clearCookie("access_token");
          return res.status(401).send("Unauthorized: Invalid token");
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