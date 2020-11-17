/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

var express = require('express');
const auth = require('../auth');
const { FARM_RUN_ROUTES } = require('../../consts/route_consts');
const { _farmRunService, _imageService } = require('../../service');
const multer = require('multer');
const router = express.Router();

const Multer = multer({
    storage: multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024
});

router.get(FARM_RUN_ROUTES.GET_FARM_RUN, auth.user, (req, res) => {
    _farmRunService
        .getFarmRun(req.user.id, req.params.type)
        .then(farmRun => res.status(200).send(farmRun))
        .catch(err => res.status(400).send(err.message));
});

router.post(FARM_RUN_ROUTES.CREATE, Multer.array('images'), auth.user, _imageService.uploadMultipleToBucket, (req, res) => {
    _farmRunService
        .createFarmRun(req.user, req.body, req.files)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(400).json(err.message));
});

router.post(FARM_RUN_ROUTES.EDIT, Multer.array('images'), auth.user, _imageService.uploadMultipleToBucket, (req, res) => {
    _farmRunService
        .editFarmRun(req.user, req.body, req.files)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(400).json(err.message));
});

module.exports = router;