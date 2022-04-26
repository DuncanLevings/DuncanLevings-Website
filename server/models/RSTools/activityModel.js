/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    ownerId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    preset: { type: Object, required: true },
    title: { type: String, required: true },
    webURL: { type: String },
    youtubeURL: { type: String },
    notes: { type: String }
});

activitySchema.set('toJSON', { virtuals: true });
const Activity = mongoose.model('Activity', activitySchema, 'activities');

module.exports = { Activity }