/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

const mongoose = require('mongoose');

const abilityBarSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    styleType: { type: Number, required: true },
    abilityBar: { type: Array, required: true }
});

abilityBarSchema.set('toJSON', { virtuals: true });
const AbilityBar = mongoose.model('AbilityBar', abilityBarSchema, 'abilityBars');

module.exports = { AbilityBar }