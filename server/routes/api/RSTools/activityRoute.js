/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

var express = require('express');
const { ACTIVITY_ROUTES } = require('../../consts/route_consts');
const { _activityService } = require('../../service');
const multer = require('multer');
const auth = require('../auth');
const router = express.Router();

const Multer = multer({
    storage: multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024
  });

router.get(ACTIVITY_ROUTES.GET_ALL, auth.user, (req, res) => {
    _activityService
        .getActivities(req.user._id)
        .then(activities => res.status(200).send(activities))
        .catch(err => res.status(400).send(err.message));
});

router.get(ACTIVITY_ROUTES.GET_SINGLE, auth.user, (req, res) => {
    _activityService
        .getActivity(req.user._id, req.params.activityId)
        .then(activity => res.status(200).send(activity))
        .catch(err => res.status(400).send(err.message));
});

router.post(ACTIVITY_ROUTES.CREATE, Multer.any(), auth.user, (req, res) => {
    _activityService
        .createActivity(req.user._id, req.body)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(400).json(err.message));
});

router.post(ACTIVITY_ROUTES.EDIT, Multer.any(), auth.user, (req, res) => {
    _activityService
        .editActivity(req.user._id, req.body)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(400).json(err.message));
});

router.delete(ACTIVITY_ROUTES.DELETE, auth.user, (req, res) => {
    _activityService
        .deleteActivity(req.user.id, req.params.activityId)
        .then(activities => res.status(200).send(activities))
        .catch(err => res.status(400).json(err.message));
});

router.get(ACTIVITY_ROUTES.VIS_WAX, auth.user, (req, res) => {
    _activityService
        .scrapeVisWaxHtmlData()
        .then(data => res.status(200).send(data))
        .catch(err => res.status(400).send(err.message));
});

router.get(ACTIVITY_ROUTES.NEMI_FOREST, auth.user, (req, res) => {
    _activityService
        .getLatestNemiForest()
        .then(data => res.status(200).send(data))
        .catch(err => res.status(400).send(err.message));
});

module.exports = router;

