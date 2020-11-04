/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

var express = require('express');
const { ACTIVITY_ROUTES } = require('../../consts/route_consts');
const { _activityService } = require('../../service');
const auth = require('../auth');
const router = express.Router();

router.get(ACTIVITY_ROUTES.NEMI_FOREST, auth.user, (req, res) => {
    _activityService
        .getLatestNemiForest()
        .then(data => res.status(200).send(data))
        .catch(err => res.status(400).send(err.message));
});

module.exports = router;

