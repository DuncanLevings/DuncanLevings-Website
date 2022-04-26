/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

const mongoose = require('mongoose');

const farmRunSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    preset: { type: Object, required: true },
    webURL: { type: String },
    youtubeURL: { type: String },
    notes: { type: String },
    hidden: { type: Array },
    steps: { type: Array, required: true },
    type: { type: Number, required: true }
});

farmRunSchema.set('toJSON', { virtuals: true });
const FarmRun = mongoose.model('FarmRun', farmRunSchema, 'farmRuns');

module.exports = { FarmRun }