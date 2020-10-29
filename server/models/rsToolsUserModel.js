/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

const mongoose = require('mongoose');

const dailyListSchema = new mongoose.Schema({
    dailyId: { type: mongoose.Schema.Types.ObjectId, ref: "Daily", required: true },
    type: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
    collapsed: { type: Boolean, default: true },
    position: { type: Number, required: true }
});

const rsToolsUserSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    dailys: { 
        type: [dailyListSchema],
        default: []
    }
});

rsToolsUserSchema.set('toJSON', { virtuals: true });
const RSToolsUser = mongoose.model('RSToolsUser', rsToolsUserSchema, 'rstoolsUser');

module.exports = { RSToolsUser }