/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

const mongoose = require('mongoose');

const presetSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    equipSlotData: { type: Array },
    inventorySlotData: { type: Array },
    familiar: { type: Object },
    familiarSlotData: { type: Array },
    abilityBarData: { type: Array },
    presetAbilityBar: { type: Object },
    prayerData: { type: Array },
    prayerType: { type: Number }
});

presetSchema.set('toJSON', { virtuals: true });
const Preset = mongoose.model('Preset', presetSchema, 'presets');

module.exports = { Preset }