/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

var express = require('express');
const { SALARY_ROUTES } = require('../../../consts/route_consts');
const { _emailService } = require('../../../service');
const router = express.Router();

router.post(SALARY_ROUTES._ROOT, (req, res) => {
    // _emailService
    //   .sendMail(req.body)
    //   .then(() => res.sendStatus(200))
    //   .catch(err => res.status(400).json(err.message));
  });

module.exports = router;