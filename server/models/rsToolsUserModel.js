/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

const mongoose = require('mongoose');

const dailyListSchema = new mongoose.Schema({
    dailyId: { type: mongoose.Types.ObjectId, ref: "Daily", required: true },
    completed: { type: Boolean, default: false },
    position: { type: Number, required: true }
});

const resetTimeSchema = new mongoose.Schema({
    lastDayReset: { type: Date, default: new Date() },
    lastWeekReset: { type: Date, default: new Date() },
    lastMonthReset: { type: Date, default: new Date() },
});

const rsToolsUserSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    dailys: {
        type: [dailyListSchema],
        default: []
    },
    weeklys: {
        type: [dailyListSchema],
        default: []
    },
    monthlys: {
        type: [dailyListSchema],
        default: []
    },
    resetTimes: {
        type: resetTimeSchema,
        default: {}
    }
});

rsToolsUserSchema.set('toJSON', { virtuals: true });
const RSToolsUser = mongoose.model('RSToolsUser', rsToolsUserSchema, 'rstoolsUser');

module.exports = { RSToolsUser }