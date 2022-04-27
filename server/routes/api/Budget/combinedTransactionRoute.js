/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

var express = require('express');
const auth = require('../../auth');
const { COMBINED_TRANSACTION_ROUTES } = require('../../../consts/route_consts');
const { _combinedTransactionService } = require('../../../service');
const router = express.Router();

router.get(COMBINED_TRANSACTION_ROUTES.COMBINED_ROOT, auth.user, (req, res) => {
  _combinedTransactionService
    .getAllCombined()
    .then(combined => res.status(200).send(combined))
    .catch(err => res.status(400).send(err.message));
});

router.post(COMBINED_TRANSACTION_ROUTES.COMBINED_ROOT, auth.user, (req, res) => {
  _combinedTransactionService
    .createCombined(req.user._id, req.body)
    .then(combined => res.status(200).send(combined))
    .catch(err => res.status(400).json(err.message));
});

router.put(COMBINED_TRANSACTION_ROUTES.COMBINED_ROOT, auth.user, (req, res) => {
  _combinedTransactionService
    .editCombined(req.user._id, req.body)
    .then(combined => res.status(200).send(combined))
    .catch(err => res.status(400).json(err.message));
});

router.delete(COMBINED_TRANSACTION_ROUTES.COMBINED_ROOT, auth.user, (req, res) => {
  _combinedTransactionService
    .deleteCombined(req.user._id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(400).json(err.message));
});

module.exports = router;