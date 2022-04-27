/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

var express = require('express');
const auth = require('../../auth');
const { BUDGET_ROUTES } = require('../../../consts/route_consts');
const { _budgetService } = require('../../../service');
const router = express.Router();

router.get(BUDGET_ROUTES.BUDGET_ROOT, auth.user, (req, res) => {
  _budgetService
    .getAllBudget()
    .then(budget => res.status(200).send(budget))
    .catch(err => res.status(400).send(err.message));
});

router.post(BUDGET_ROUTES.BUDGET_ROOT, auth.user, (req, res) => {
  _budgetService
    .createBudget(req.user._id, req.body)
    .then(budget => res.status(200).send(budget))
    .catch(err => res.status(400).json(err.message));
});

router.put(BUDGET_ROUTES.BUDGET_ROOT, auth.user, (req, res) => {
  _budgetService
    .editBudget(req.user._id, req.body)
    .then(budget => res.status(200).send(budget))
    .catch(err => res.status(400).json(err.message));
});

router.delete(BUDGET_ROUTES.BUDGET_ROOT, auth.user, (req, res) => {
  _budgetService
    .deleteBudget(req.user._id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(400).json(err.message));
});

module.exports = router;