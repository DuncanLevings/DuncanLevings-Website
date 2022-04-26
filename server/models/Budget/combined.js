/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

const mongoose = require('mongoose');

const combinedTransactionSchema = new mongoose.Schema({
    transactionId: { type: mongoose.Types.ObjectId, ref: "Transaction", required: true },
    name: { type: String, required: true },
    type: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    note: { type: String }
});

combinedTransactionSchema.set('toJSON', { virtuals: true });
const CombinedTransaction = mongoose.model('CombinedTransaction', combinedTransactionSchema, 'combined_transaction');

module.exports = { CombinedTransaction }