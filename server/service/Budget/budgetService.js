/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';
const { BUDGET_ERRORS } = require("../../consts/error_jsons");
const { Budget } = require("../../config/mongo");
const { auditTypes, createAudit } = require('./auditService');
const mongoose = require('mongoose');

const budgetTypes = {
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
    ALLOWANCE_UPMA: 17
}

const getAllBudget = async () => {
    return await Budget.find();
}

const getBudget = async (id) => {
    return await Budget.findOne({ _id: mongoose.Types.ObjectId(id) });
}

const createBudget = async (userId, data) => {
    const budget = new Budget(new BudgetBuilder()
        .withName(data.name)
        .withType(data.type)
        .withAmount(data.amount)
        .withNote(data.note)
    );

    await createAudit(userId, {
        type: auditTypes.CREATE_BUDGET,
        new: budget.toJSON()
    })

    return await budget.save();
}

const editBudget = async (userId, data) => {
    try {
        const budget = await Budget.findOne({ _id: mongoose.Types.ObjectId(data.id) });

        var old = JSON.parse(JSON.stringify(budget.toJSON()));

        validateType(data.type)
        validateAmount(data.amount)

        budget.name = data.name
        budget.type = data.type
        budget.amount = data.amount
        budget.note = data.note

        await createAudit(userId, {
            type: auditTypes.EDIT_BUDGET,
            old: old,
            new: budget.toJSON(),
            note: data.note
        })

        return await budget.save();
    } catch (e) {
        throw Error(e);
    }
}

const deleteBudget = async (userId, data) => {
    const budget = await Budget.findOne({ _id: mongoose.Types.ObjectId(data.id) });

    await createAudit(userId, {
        type: auditTypes.DELETE_TRANSACTION,
        old: budget.toJSON(),
        note: data.note
    })

    await Budget.deleteOne({ _id: data.id });
}

function validateType(type) {
    if (type < 0 || type > 17)
        throw Error(BUDGET_ERRORS.INVALID_TYPE);
}

function validateAmount(amount) {
    if (amount < 0)
        throw Error(BUDGET_ERRORS.INVALID_AMOUNT);
}

class BudgetBuilder {

    withName(name) {
        if (!name) throw Error(BUDGET_ERRORS.MISSING_NAME);
        this.name = name;
        return this;
    }

    withType(type) {
        validateType(type);
        this.type = type;
        return this;
    }

    withAmount(amount) {
        if (!amount) throw Error(BUDGET_ERRORS.MISSING_AMOUNT);
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
    getAllBudget,
    getBudget,
    createBudget,
    editBudget,
    deleteBudget
}

