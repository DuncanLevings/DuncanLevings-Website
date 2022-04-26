/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: false },
    name: { type: String, required: true },
    type: { type: Number, required: true },
    date: { type: Date, default: new Date() },
    amount: { type: Number, required: true },
    note: { type: String }
});

transactionSchema.set('toJSON', { virtuals: true });
const Transaction = mongoose.model('Transaction', transactionSchema, 'transaction');

module.exports = { Transaction }