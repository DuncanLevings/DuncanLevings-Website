/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

var express = require('express');
const auth = require('../auth');
const { PVM_ROUTES } = require('../../consts/route_consts');
const { _imageService, _pvmService } = require('../../service');
const multer = require('multer');
const router = express.Router();

const Multer = multer({
    storage: multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024
});

router.get(PVM_ROUTES.SEARCH_PVM, auth.user, (req, res) => {
    //   _dailyService
    //     .searchDailys(req.user.id, req.params.type, req.params.filter)
    //     .then(dailys => res.status(200).send(dailys))
    //     .catch(err => res.status(400).send(err.message));
});

router.get(PVM_ROUTES.GET_PVM_TASKS, auth.user, (req, res) => {
    //   _dailyService
    //     .getDailys(req.user.id, req.params.type)
    //     .then(dailys => res.status(200).send(dailys))
    //     .catch(err => res.status(400).send(err.message));
});

router.get(PVM_ROUTES.GET_PVM_SINGLE, auth.user, (req, res) => {
    //   _dailyService
    //     .getDaily(req.user.id, req.params.id)
    //     .then(daily => res.status(200).send(daily))
    //     .catch(err => res.status(400).send(err.message));
});

router.get(PVM_ROUTES.GET_PVM_TASK_SINGLE, auth.user, (req, res) => {
    //   _dailyService
    //     .getDaily(req.user.id, req.params.id)
    //     .then(daily => res.status(200).send(daily))
    //     .catch(err => res.status(400).send(err.message));
});

router.post(PVM_ROUTES.CREATE_PVM, Multer.array('images'), auth.user, _imageService.uploadMultipleToBucket, (req, res) => {
    _pvmService
        .createPvm(req.user, req.body, req.files)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(400).json(err.message));
});

router.post(PVM_ROUTES.CREATE_PVM_TASK, Multer.array('images'), auth.user, _imageService.uploadMultipleToBucket, (req, res) => {
    //   _dailyService
    //     .createDaily(req.user, req.body, req.files)
    //     .then(() => res.sendStatus(200))
    //     .catch(err => res.status(400).json(err.message));
});

router.post(PVM_ROUTES.EDIT_PVM, Multer.array('images'), auth.user, _imageService.uploadMultipleToBucket, (req, res) => {
    //   _dailyService
    //     .editDaily(req.user._id, req.body, req.files)
    //     .then(() => res.sendStatus(200))
    //     .catch(err => res.status(400).json(err.message));
});

router.post(PVM_ROUTES.EDIT_PVM_TASK, Multer.array('images'), auth.user, _imageService.uploadMultipleToBucket, (req, res) => {
    //   _dailyService
    //     .editDaily(req.user._id, req.body, req.files)
    //     .then(() => res.sendStatus(200))
    //     .catch(err => res.status(400).json(err.message));
});

router.delete(PVM_ROUTES.DELETE_PVM, auth.user, (req, res) => {
    //   _dailyService
    //     .deleteDaily(req.user.id, req.params.id)
    //     .then(dailys => res.status(200).send(dailys))
    //     .catch(err => res.status(400).json(err.message));
});

router.delete(PVM_ROUTES.DELETE_PVM_TASK, auth.user, (req, res) => {
    //   _dailyService
    //     .deleteDaily(req.user.id, req.params.id)
    //     .then(dailys => res.status(200).send(dailys))
    //     .catch(err => res.status(400).json(err.message));
});

module.exports = router;