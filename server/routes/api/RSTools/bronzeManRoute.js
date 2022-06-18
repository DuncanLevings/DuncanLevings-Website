/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

var express = require('express');
const auth = require('../../auth');
const { BRONZE_MAN_ITEM_ROUTES } = require('../../../consts/route_consts');
const { _bronzeManService } = require('../../../service');
const multer = require('multer');
const router = express.Router();

const Multer = multer({
    storage: multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024
});

router.get(BRONZE_MAN_ITEM_ROUTES.GET_ITEMS, auth.user, (req, res) => {
    _bronzeManService
        .getItems(req.user._id, req.params.name)
        .then(items => res.status(200).send(items))
        .catch(err => res.status(400).send(err.message));
});

router.get(BRONZE_MAN_ITEM_ROUTES.SET_ACQUIRED, auth.user, (req, res) => {
    _bronzeManService
        .setAcquired(req.user._id, req.params.itemId)
        .then(item => res.status(200).send(item))
        .catch(err => res.status(400).send(err.message));
});

router.post(BRONZE_MAN_ITEM_ROUTES.CREATE_ITEM, Multer.any(), auth.user, (req, res) => {
    _bronzeManService
        .createItem(req.user._id, req.body)
        .then(item => res.status(200).send(item))
        .catch(err => res.status(400).send(err.message));
});

router.delete(BRONZE_MAN_ITEM_ROUTES.DELETE_ITEM, auth.user, (req, res) => {
    _bronzeManService
        .deleteItem(req.user._id, req.params.itemId)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(400).send(err.message));
});

module.exports = router;