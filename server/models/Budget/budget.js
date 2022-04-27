/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: Number, required: true },
    amount: { type: Number, required: true },
    note: { type: String }
});

budgetSchema.methods.toJSON = function () {
    return {
        _id: this._id,
        name: this.name,
        type: this.type,
        amount: this.amount,
        note: this.note
    };
};

budgetSchema.set('toJSON', { virtuals: true });
const Budget = mongoose.model('Budget', budgetSchema, 'budget');

module.exports = { Budget }