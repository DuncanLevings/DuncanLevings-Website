/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

const mongoose = require('mongoose');

const pvmTaskSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },         // from pvm
    mapURL: { type: String },                       // from pvm
    wikiURL: { type: String, required: true },      // from pvm
    imageUrl: { type: String, required: true },     // from pvm
    thumbnailURL: { type: String, required: true }, // from pvm
    type: { type: Number, required: true },         // from pvm
    preset: { type: Object, required: true },
    webURL: { type: String },
    youtubeURL: { type: String },
    notes: { type: String }
});

pvmTaskSchema.set('toJSON', { virtuals: true });
const PvmTask = mongoose.model('PvmTask', pvmTaskSchema, 'pvmtasks');

module.exports = { PvmTask }