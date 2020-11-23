/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    slot: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    thumbnailUrl: { type: String },
    wiki: { type: String },
    augment: {
        isAugmented: { type: Boolean },
        gizmo1: { type: String },
        gizmo2: { type: String }
    },
    familiarSize: { type: Number }
});

itemSchema.set('toJSON', { virtuals: true });
const Item = mongoose.model('Item', itemSchema, 'items');

module.exports = { Item }