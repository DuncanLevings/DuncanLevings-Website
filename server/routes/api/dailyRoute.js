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

router.get(DAILY_ROUTES.SEARCH_DAILYS, auth.user, (req, res) => {
  _dailyService
    .searchDailys(req.user.id, req.params.type, req.params.filter)
    .then(dailys => res.status(200).send(dailys))
    .catch(err => res.status(400).send(err.message));
});

router.post(DAILY_ROUTES.ADD, auth.user, (req, res) => {
  _dailyService
    .addDaily(req.user.id, req.body.id, req.body.type, req.body.filter)
    .then(dailys => res.status(200).send(dailys))
    .catch(err => res.status(400).send(err.message));
});

router.post(DAILY_ROUTES.HIDE, auth.user, (req, res) => {
  _dailyService
    .hideDaily(req.user.id, req.body.id)
    .then(dailys => res.status(200).send(dailys))
    .catch(err => res.status(400).send(err.message));
});

router.post(DAILY_ROUTES.CREATE, Multer.array('images'), auth.user, _imageService.uploadMultipleToBucket, (req, res) => {
  _dailyService
    .createDaily(req.user, req.body, req.files)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(400).json(err.message));
});

router.post(DAILY_ROUTES.EDIT, auth.user, (req, res) => {
  
});

router.delete(DAILY_ROUTES.DELETE, auth.user, (req, res) => {
  _dailyService
    .deleteDaily(req.user.id, req.params.id)
    .then(dailys => res.status(200).send(dailys))
    .catch(err => res.status(400).json(err.message));
});

router.post(DAILY_ROUTES.REORDER, auth.user, (req, res) => {
  
});

module.exports = router;