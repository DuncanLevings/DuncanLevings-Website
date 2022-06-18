/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

const mongoose = require('mongoose');

const bronzeManItemSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    acquired: { type: Boolean, default: false }
});

bronzeManItemSchema.set('toJSON', { virtuals: true });
const BronzeManItem = mongoose.model('BronzeManItem', bronzeManItemSchema, 'bronzeManItems');

module.exports = { BronzeManItem }