/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

const mongoose = require('mongoose');

const pvmSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    mapURL: { type: String },
    wikiURL: { type: String, required: true },
    imageUrl: { type: String, required: true },
    thumbnailURL: { type: String, required: true },
    type: { type: Number, required: true }
});

pvmSchema.set('toJSON', { virtuals: true });
const PvM = mongoose.model('PvM', pvmSchema, 'pvms');

module.exports = { PvM }