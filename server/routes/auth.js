const jwtweb = require('jsonwebtoken');
const ***REMOVED*** secret ***REMOVED*** = require("../config.json");

const auth = (req, res, next) => ***REMOVED***
  const token = req.cookies.access_token;
  if (!token) ***REMOVED***
    res.status(401).send("Unauthorized: No token provided");
  ***REMOVED*** else ***REMOVED***
    jwtweb.verify(token, secret, function (err, decoded) ***REMOVED***
      console.log(decoded)
      //check expire
      if (err) ***REMOVED***
        res.clearCookie("access_token");
        res.status(401).send("Unauthorized: Invalid token");
      ***REMOVED*** else ***REMOVED***
        return next();
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***
***REMOVED***;

module.exports = auth;