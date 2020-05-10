/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

 "use strict";

var express = require('express');
const passport = require('passport');
const auth = require("../auth");
const userService = require("../../service/userService");
var router = express.Router();

router.post("/register", auth.optional, (req, res) => ***REMOVED***
  userService
    .registerUser(req.body.name, req.body.password)
    .then(user => res.status(200).send(user))
    .catch(err => res.status(422).json(err.message));
***REMOVED***);

router.post("/login", auth.optional, (req, res) => ***REMOVED***
  if (!req.body.name)
    return res.status(422).json("name is required!")

  if (!req.body.password)
    return res.status(422).json("password is required!")

  passport.authenticate("local", 
    ***REMOVED*** session: false ***REMOVED***, 
    (err, user, info) => ***REMOVED***
      if (err) return res.status(422).json(err);
      if (!user)
        return res.status(422).json("name or password is incorrect!");

      req.logIn(user, err => ***REMOVED***
        if (err) return res.status(422).json(err);

        return res.json(***REMOVED*** user: user.toAuthJSON() ***REMOVED***);
      ***REMOVED***);
  ***REMOVED***)(req, res);
***REMOVED***);

module.exports = router;
