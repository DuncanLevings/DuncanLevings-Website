/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

var express = require('express');
const auth = require('../../auth');
const { SALARY_ROUTES } = require('../../../consts/route_consts');
const { _salaryService } = require('../../../service');
const router = express.Router();

router.get(SALARY_ROUTES.SALARY_ROOT, auth.user, (req, res) => {
  _salaryService
    .getAllSalary()
    .then(salary => res.status(200).send(salary))
    .catch(err => res.status(400).send(err.message));
});

router.get(SALARY_ROUTES.SALARY_FOR_USER, auth.user, (req, res) => {
  _salaryService
    .getSalary(req.user.id)
    .then(salary => res.status(200).send(salary))
    .catch(err => res.status(400).send(err.message));
});

router.post(SALARY_ROUTES.SALARY_ROOT, auth.user, (req, res) => {
    _salaryService
      .createSalary(req.user._id, req.body)
      .then(salary => res.status(200).send(salary))
      .catch(err => res.status(400).json(err.message));
});

router.put(SALARY_ROUTES.SALARY_ROOT, auth.user, (req, res) => {
  _salaryService
    .editSalary(req.user._id, req.body)
    .then(salary => res.status(200).send(salary))
    .catch(err => res.status(400).json(err.message));
});

module.exports = router;