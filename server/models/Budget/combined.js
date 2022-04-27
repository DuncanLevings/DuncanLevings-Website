/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transactionId: { type: mongoose.Types.ObjectId, ref: "Transaction", required: true }
}, { _id : false });

const combinedTransactionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: Number, required: true },
    totalAmount: { type: Number, default: 0 },
    note: { type: String },
    transactions: {
        type: [transactionSchema],
        default: []
    },
});

combinedTransactionSchema.methods.toJSON = function () {
    return {
        _id: this._id,
        name: this.name,
        type: this.type,
        totalAmount: this.totalAmount,
        note: this.note,
        transactions: this.transactions
    };
};

combinedTransactionSchema.set('toJSON', { virtuals: true });
const CombinedTransaction = mongoose.model('CombinedTransaction', combinedTransactionSchema, 'combined_transaction');

module.exports = { CombinedTransaction }