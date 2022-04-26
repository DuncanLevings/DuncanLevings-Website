/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

var express = require('express');
const auth = require('../../auth');
const { PVM_ROUTES } = require('../../../consts/route_consts');
const { _imageService, _pvmService } = require('../../../service');
const multer = require('multer');
const router = express.Router();

const Multer = multer({
    storage: multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024
});

router.get(PVM_ROUTES.SEARCH_PVM, auth.user, (req, res) => {
    _pvmService
        .searchPvm(req.user._id, req.params.type, req.params.filter)
        .then(pvms => res.status(200).send(pvms))
        .catch(err => res.status(400).send(err.message));
});

router.get(PVM_ROUTES.GET_PVM_TASKS, auth.user, (req, res) => {
    _pvmService
        .getPvmTasks(req.user._id, req.params.type)
        .then(pvmTasks => res.status(200).send(pvmTasks))
        .catch(err => res.status(400).send(err.message));
});

router.get(PVM_ROUTES.GET_PVM_SINGLE, auth.user, (req, res) => {
    _pvmService
        .getPvm(req.params.pvmId)
        .then(pvm => res.status(200).send(pvm))
        .catch(err => res.status(400).send(err.message));
});

router.get(PVM_ROUTES.GET_PVM_TASK_SINGLE, auth.user, (req, res) => {
    _pvmService
        .getPvmTask(req.user.id, req.params.pvmTaskId)
        .then(pvmTask => res.status(200).send(pvmTask))
        .catch(err => res.status(400).send(err.message));
});

router.post(PVM_ROUTES.CHECK_PVM_NAME, Multer.any(), auth.user, (req, res) => {
    _pvmService
        .checkPvmName(req.body)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(400).json(err.message));
});

router.post(PVM_ROUTES.CREATE_PVM, Multer.array('images'), auth.user, _imageService.uploadMultipleToBucket, (req, res) => {
    _pvmService
        .createPvm(req.user, req.body, req.files)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(400).json(err.message));
});

router.post(PVM_ROUTES.CREATE_PVM_TASK, Multer.any(), auth.user, (req, res) => {
    _pvmService
        .createPvmTask(req.user._id, req.body)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(400).json(err.message));
});

router.post(PVM_ROUTES.EDIT_PVM, Multer.array('images'), auth.user, _imageService.uploadMultipleToBucket, (req, res) => {
    _pvmService
        .editPvm(req.user._id, req.body, req.files)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(400).json(err.message));
});

router.post(PVM_ROUTES.EDIT_PVM_TASK, Multer.any(), auth.user, (req, res) => {
    _pvmService
        .editPvmTask(req.user._id, req.body)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(400).json(err.message));
});

router.delete(PVM_ROUTES.DELETE_PVM, auth.user, (req, res) => {
    _pvmService
        .deletePvm(req.user.id, req.params.pvmId, req.params.filter)
        .then(pvms => res.status(200).send(pvms))
        .catch(err => res.status(400).json(err.message));
});

router.delete(PVM_ROUTES.DELETE_PVM_TASK, auth.user, (req, res) => {
    _pvmService
        .deletePvmTask(req.user.id, req.params.pvmTaskId)
        .then(pvmTasks => res.status(200).send(pvmTasks))
        .catch(err => res.status(400).json(err.message));
});

module.exports = router;