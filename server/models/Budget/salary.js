/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: false },
    yearly: { type: Number, required: true },
    payCheck: { type: Number, required: true }
});

salarySchema.set('toJSON', { virtuals: true });
const Salary = mongoose.model('Salary', salarySchema, 'salary');

module.exports = { Salary }