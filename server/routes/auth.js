const jwt = require('express-jwt');
const ***REMOVED*** secret ***REMOVED*** = require("../config.json");

const getTokenFromHeaders = (req) => ***REMOVED***
  const ***REMOVED*** headers: ***REMOVED*** authorization ***REMOVED*** ***REMOVED*** = req;

  if(authorization && authorization.split(' ')[0] === 'Token') ***REMOVED***
    return authorization.split(' ')[1];
  ***REMOVED***
  return null;
***REMOVED***;

const auth = ***REMOVED***
  required: jwt(***REMOVED***
    secret: secret,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  ***REMOVED***),
  optional: jwt(***REMOVED***
    secret: secret,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  ***REMOVED***),
***REMOVED***;

module.exports = auth;