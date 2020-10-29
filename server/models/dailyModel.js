/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

const mongoose = require('mongoose');

const dailySchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    type: { type: Number, required: true },
    steps: { type: Array, required: true },
    publicDaily: { type: Boolean, default: false }
});

dailySchema.set('toJSON', { virtuals: true });
const Daily = mongoose.model('Daily', dailySchema, 'dailys');

module.exports = { Daily }