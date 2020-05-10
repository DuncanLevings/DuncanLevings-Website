var express = require('express');
const passport = require('passport');
const auth = require("../auth");
const userService = require("../../service/userService");
var router = express.Router();

router.post("/register", (req, res) => ***REMOVED***
  console.log("HERE")
  const ***REMOVED*** body: ***REMOVED*** user ***REMOVED*** ***REMOVED*** = req;
  
  userService
    .registerUser(user.name, user.password)
    .then(user => ***REMOVED***

    ***REMOVED***)
    .catch(err => res.status(422).json(err));
***REMOVED***);

module.exports = router;
