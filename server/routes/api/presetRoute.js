/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

var express = require('express');
const auth = require('../auth');
const { PRESET_ROUTES } = require('../../consts/route_consts');
const { _presetService } = require('../../service');
const router = express.Router();

router.get(PRESET_ROUTES.GET_PRESETS, auth.user, (req, res) => {
    _presetService
        .getPresets(req.user._id)
        .then(presets => res.status(200).send(presets))
        .catch(err => res.status(400).send(err.message));
});

router.get(PRESET_ROUTES.GET_PRESET_SINGLE, auth.user, (req, res) => {
    _presetService
        .getPreset(req.user._id, req.params.presetId)
        .then(preset => res.status(200).send(preset))
        .catch(err => res.status(400).send(err.message));
});

router.post(PRESET_ROUTES.CREATE_PRESET, auth.user, (req, res) => {
    _presetService
        .createPreset(req.user._id, req.body)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(400).json(err.message));
});

router.post(PRESET_ROUTES.EDIT_PRESET, auth.user, (req, res) => {
    console.log(req.body)
    // _equipmentService
    //     .editItem(req.user._id, req.body, req.file, req.params.slots)
    //     .then(items => res.status(200).send(items))
    //     .catch(err => res.status(400).json(err.message));
});

// router.delete(PRESET_ROUTES.DELETE_ITEM, auth.user, (req, res) => {
//     _equipmentService
//         .deleteItem(req.user.id, req.params.itemId, req.params.slots)
//         .then(items => res.status(200).send(items))
//         .catch(err => res.status(400).json(err.message));
// });

module.exports = router;