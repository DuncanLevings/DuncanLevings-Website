/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: false },
    type: { type: Number, required: true },
    date: { type: Date, default: new Date() },
    oldValue: { type: Object },
    newValue: { type: Object },
    note: { type: String }
});

auditSchema.set('toJSON', { virtuals: true });
const Audit = mongoose.model('Audit', auditSchema, 'audit');

module.exports = { Audit }