/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';
const { COMBINED_TRANSACTION_ERRORS } = require("../../consts/error_jsons");
const { CombinedTransaction } = require("../../config/mongo");
const { auditTypes, createAudit } = require('./auditService');
const mongoose = require('mongoose');

const combinedTypes = {
    TRIP: 0,
    OTHER: 0
}

const getAllCombined = async () => {
    return await CombinedTransaction.find();
}

const getCombined = async (id) => {
    return await CombinedTransaction.findOne({ _id: mongoose.Types.ObjectId(id) });
}

const createCombined = async (userId, data) => {
    const combined = new CombinedTransaction(new CombinedBuilder()
        .withName(data.name)
        .withType(data.type)
        .withNote(data.note)
        .withTransactions(data.transactions)
    );

    await createAudit(userId, {
        type: auditTypes.CREATE_COMBINED_TRANSACTION,
        new: combined.toJSON()
    })

    return await combined.save();
}

const editCombined = async (userId, data) => {
    try {
        const combined = await CombinedTransaction.findOne({ _id: mongoose.Types.ObjectId(data.id) });

        var old = JSON.parse(JSON.stringify(combined.toJSON()));

        validateType(data.type)

        combined.name = data.name
        combined.type = data.type
        combined.note = data.note
        combined.transactions = data.transactions

        await createAudit(userId, {
            type: auditTypes.EDIT_COMBINED_TRANSACTION,
            old: old,
            new: combined.toJSON(),
            note: data.note
        })

        return await combined.save();
    } catch (e) {
        throw Error(e);
    }
}

const deleteCombined = async (userId, data) => {
    const combined = await CombinedTransaction.findOne({ _id: mongoose.Types.ObjectId(data.id) });

    await createAudit(userId, {
        type: auditTypes.DELETE_COMBINED_TRANSACTION,
        old: combined.toJSON(),
        note: data.note
    })

    await CombinedTransaction.deleteOne({ _id: data.id });
}

function validateType(type) {
    if (type < 0 || type > 1)
        throw Error(COMBINED_TRANSACTION_ERRORS.INVALID_TYPE);
}

class CombinedBuilder {

    withName(name) {
        if (!name) throw Error(COMBINED_TRANSACTION_ERRORS.MISSING_NAME);
        this.name = name;
        return this;
    }

    withType(type) {
        validateType(type);
        this.type = type;
        return this;
    }

    withNote(note) {
        if (!note) return this;
        this.note = note;
        return this;
    }

    withTransactions(transactions) {
        if (!transactions) return this;
        this.transactions = transactions;
        return this;
    }
}

module.exports = {
    getAllCombined,
    getCombined,
    createCombined,
    editCombined,
    deleteCombined
}

