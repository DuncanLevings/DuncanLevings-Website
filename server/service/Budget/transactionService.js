/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';
const { TRANSACTION_ERRORS } = require("../../consts/error_jsons");
const { Transaction } = require("../../config/mongo");
const { auditTypes, createAudit } = require('./auditService');
const mongoose = require('mongoose');
const moment = require('moment-timezone');

const transactionTypes = {
    RRSP: 0,
    TFSA: 1,
    TENANT_INSURANCE: 2,
    HYDRO: 3,
    PHONE: 4,
    INTERNET: 5,
    AMAZON_PRIME: 6,
    GOOGLE_SERVICE: 7,
    NETFLIX: 8,
    DATE: 9,
    ADHOC: 10,
    GROCERY: 11,
    SUPPLY: 12,
    CAR_INSURANCE: 13,
    TRANSPORTATION: 14,
    GAS: 15,
    ALLOWANCE_DUNCAN: 16,
    ALLOWANCE_UPMA: 17,
    SALARY: 18,
    GIFT: 19
}

const getAllTransaction = async () => {
    return await Transaction.find();
}

const getTransaction = async (id) => {
    return await Transaction.findOne({ _id: mongoose.Types.ObjectId(id) });
}

const createTransaction = async (userId, data) => {
    const transaction = new Transaction(new TransactionBuilder()
        .withUser(userId)
        .withName(data.name)
        .withType(data.type)
        .withDate(data.date)
        .withAmount(data.amount)
        .withNote(data.note)
    );

    await createAudit(userId, {
        type: auditTypes.CREATE_TRANSACTION,
        new: transaction.toJSON()
    })

    return await transaction.save();
}

const editTransaction = async (userId, data) => {
    try {
        const transaction = await Transaction.findOne({ _id: mongoose.Types.ObjectId(data.id) });

        var old = JSON.parse(JSON.stringify(transaction.toJSON()));

        validateType(data.type)
        validateAmount(data.amount)

        transaction.name = data.name
        transaction.type = data.type
        transaction.date = moment(data.date, 'YYYY-MM-DD').toDate();
        transaction.amount = data.amount
        transaction.note = data.note

        await createAudit(userId, {
            type: auditTypes.EDIT_TRANSACTION,
            old: old,
            new: transaction.toJSON(),
            note: data.note
        })

        return await transaction.save();
    } catch (e) {
        throw Error(e);
    }
}

const deleteTransaction = async (userId, data) => {
    const transaction = await Transaction.findOne({ _id: mongoose.Types.ObjectId(data.id) });

    await createAudit(userId, {
        type: auditTypes.DELETE_TRANSACTION,
        old: transaction.toJSON(),
        note: data.note
    })

    await Transaction.deleteOne({ _id: data.id });
}

function validateType(type) {
    if (type < 0 || type > 19)
        throw Error(TRANSACTION_ERRORS.INVALID_TYPE);
}

function validateAmount(amount) {
    if (amount < 0)
        throw Error(TRANSACTION_ERRORS.INVALID_AMOUNT);
}

class TransactionBuilder {
    withUser(id) {
        if (!id) throw Error(TRANSACTION_ERRORS.MISSING_USER);
        this.userId = id;
        return this;
    }

    withName(name) {
        if (!name) throw Error(TRANSACTION_ERRORS.MISSING_NAME);
        this.name = name;
        return this;
    }

    withType(type) {
        validateType(type);
        this.type = type;
        return this;
    }

    withDate(date) {
        if (!date) return this;
        this.date = moment(date, 'YYYY-MM-DD').toDate();
        return this;
    }

    withAmount(amount) {
        if (!amount) throw Error(TRANSACTION_ERRORS.MISSING_AMOUNT);
        validateAmount(amount);
        this.amount = amount;
        return this;
    }

    withNote(note) {
        if (!note) return this;
        this.note = note;
        return this;
    }
}

module.exports = {
    getAllTransaction,
    getTransaction,
    createTransaction,
    editTransaction,
    deleteTransaction
}

