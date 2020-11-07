/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

var express = require('express');
const auth = require('../auth');
const { EQUIPMENT_ROUTES } = require('../../consts/route_consts');
const { _imageService, _equipmentService } = require('../../service');
const multer = require('multer');
const router = express.Router();

const Multer = multer({
    storage: multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024
});

router.get(EQUIPMENT_ROUTES.GET_ITEMS, auth.user, (req, res) => {
    // todo
});

router.get(EQUIPMENT_ROUTES.GET_ITEM_SINGLE, auth.user, (req, res) => {
    _equipmentService
        .getItem(req.user._id, req.params.itemId)
        .then(item => res.status(200).send(item))
        .catch(err => res.status(400).send(err.message));
});

router.get(EQUIPMENT_ROUTES.SEARCH_ITEMS, auth.user, (req, res) => {
    _equipmentService
        .searchItems(req.user._id, req.params.slots)
        .then(items => res.status(200).send(items))
        .catch(err => res.status(400).send(err.message));
});

router.post(EQUIPMENT_ROUTES.CREATE_ITEM, Multer.single('image'), auth.user, _imageService.uploadSingleToBucket, (req, res) => {
    _equipmentService
        .createItem(req.user._id, req.body, req.file, req.params.slots)
        .then(items => res.status(200).send(items))
        .catch(err => res.status(400).json(err.message));
});

router.post(EQUIPMENT_ROUTES.EDIT_ITEM, Multer.single('image'), auth.user, _imageService.uploadSingleToBucket, (req, res) => {
    _equipmentService
        .editItem(req.user._id, req.body, req.file, req.params.slots)
        .then(items => res.status(200).send(items))
        .catch(err => res.status(400).json(err.message));
});

router.delete(EQUIPMENT_ROUTES.DELETE_ITEM, auth.user, (req, res) => {
    _equipmentService
        .deleteItem(req.user.id, req.params.itemId, req.params.slots)
        .then(items => res.status(200).send(items))
        .catch(err => res.status(400).json(err.message));
});

module.exports = router;