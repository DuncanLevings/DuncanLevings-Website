/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

var express = require('express');
const auth = require('../../auth');
const { TRANSACTION_ROUTES } = require('../../../consts/route_consts');
const { _transactionService } = require('../../../service');
const router = express.Router();

router.get(TRANSACTION_ROUTES.TRANSACTION_ROOT, auth.user, (req, res) => {
  _transactionService
    .getAllTransaction()
    .then(transaction => res.status(200).send(transaction))
    .catch(err => res.status(400).send(err.message));
});

router.post(TRANSACTION_ROUTES.TRANSACTION_ROOT, auth.user, (req, res) => {
  _transactionService
    .createTransaction(req.user._id, req.body)
    .then(transaction => res.status(200).send(transaction))
    .catch(err => res.status(400).json(err.message));
});

router.put(TRANSACTION_ROUTES.TRANSACTION_ROOT, auth.user, (req, res) => {
  _transactionService
    .editTransaction(req.user._id, req.body)
    .then(transaction => res.status(200).send(transaction))
    .catch(err => res.status(400).json(err.message));
});

router.delete(TRANSACTION_ROUTES.TRANSACTION_ROOT, auth.user, (req, res) => {
  _transactionService
    .deleteTransaction(req.user._id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(400).json(err.message));
});

module.exports = router;