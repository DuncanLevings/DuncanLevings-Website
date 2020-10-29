/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

var express = require('express');
const auth = require('../auth');
const { DAILY_ROUTES } = require('../../consts/route_consts');
const { _imageService, _dailyService } = require('../../service');
const multer = require('multer');
const router = express.Router();

const Multer = multer({
  storage: multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024
});

router.get(DAILY_ROUTES.GET_DAILYS, auth.user, (req, res) => {
  _dailyService
    .getDailys(req.user.id, req.params.type)
    .then(dailys => res.status(200).send(dailys))
    .catch(err => res.status(400).send(err.message));
});

router.post(DAILY_ROUTES.CREATE, Multer.array('images'), auth.user, _imageService.uploadMultipleToBucket, (req, res) => {
  _dailyService
    .createDaily(req.user, req.body, req.files)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(400).json(err.message));
});

module.exports = router;