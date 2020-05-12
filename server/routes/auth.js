/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

const jwt = require('jsonwebtoken');
const ***REMOVED*** secret ***REMOVED*** = require("../config.json");

const checkAccess = (isAdmin = false) => ***REMOVED***
  return (req, res, next) => ***REMOVED***
    const token = req.cookies.access_token;
    const refresh = req.cookies.refresh_token;
    if (!token) ***REMOVED***
      if (refresh) ***REMOVED***
        // find user where refresh token = code
        // issue new access token
      ***REMOVED***
      res.status(401).send("Unauthorized: No token provided");
    ***REMOVED*** else ***REMOVED***
      jwt.verify(token, secret, function (err, decoded) ***REMOVED***
        console.log(decoded)

        if (isAdmin)
          if (!decoded.isAdmin) ***REMOVED***
            return res.status(403).send("Required admin privilege to access!");
          ***REMOVED***
        
        if (decoded.exp <= Date.now() / 1000) ***REMOVED***
          res.clearCookie("access_token");
          return res.status(401).send("Unauthorized: Token has expired!");
        ***REMOVED***
        
        //check expire
        if (err) ***REMOVED***
          res.clearCookie("access_token");
          return res.status(401).send("Unauthorized: Invalid token");
        ***REMOVED*** else ***REMOVED***
          return next();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***;
***REMOVED***

const auth = ***REMOVED***
  admin: checkAccess(true),
  user: checkAccess()
***REMOVED***

module.exports = auth;