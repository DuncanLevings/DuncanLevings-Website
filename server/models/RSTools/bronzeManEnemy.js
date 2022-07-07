/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

const mongoose = require('mongoose');

const bronzeManEnemySchema = new mongoose.Schema({
    ownerId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    wikiURL: { type: String },
    items: [
        { type: mongoose.Types.ObjectId, ref: 'BronzeManItem' }
    ]
});

bronzeManEnemySchema.set('toJSON', { virtuals: true });
const BronzeManEnemy = mongoose.model('BronzeManEnemy', bronzeManEnemySchema, 'bronzeManEnemys');

module.exports = { BronzeManEnemy }