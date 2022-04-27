/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';
const { SALARY_ERRORS } = require("../../consts/error_jsons");
const { Salary } = require("../../config/mongo");
const { auditTypes, createAudit } = require('./auditService');
const mongoose = require('mongoose');

const getAllSalary = async () => {
    return await Salary.find();
}

const getSalary = async (userId) => {
    return await Salary.find({ userId: userId });
}

const createSalary = async (userId, data) => {
    const checkExists = await Salary.countDocuments({ userId: userId });
    if (checkExists > 0) throw Error(SALARY_ERRORS.ALREADY_EXISTS);

    validateSalary(data);

    const salary = new Salary(new SalaryBuilder()
        .withUser(userId)
        .withYearly(data.yearly)
        .withPaycheck(data.payCheck)
    );

    await createAudit(userId, {
        type: auditTypes.CREATE_SALARY,
        new: JSON.stringify(salary.toJSON())
    })

    return await salary.save();
}

const editSalary = async (userId, data) => {
    try {
        const salary = await Salary.findOne({ _id: mongoose.Types.ObjectId(data.id) });
        if (!salary.userId.equals(userId)) throw Error(SALARY_ERRORS.NOT_OWNER);

        var oldSalary = JSON.parse(JSON.stringify(salary.toJSON()));

        validateSalary(data)

        salary.yearly = data.yearly;
        salary.payCheck = data.payCheck;

        await createAudit(userId, {
            type: auditTypes.EDIT_SALARY,
            old: oldSalary,
            new: salary.toJSON(),
            note: data.note
        })

        return await salary.save();
    } catch (e) {
        throw Error(e);
    }
}

function validateSalary(data) {
    if (data.payCheck > data.yearly)
        throw Error(SALARY_ERRORS.INVALID_AMOUNT);
}

class SalaryBuilder {
    withUser(id) {
        if (!id) throw Error(SALARY_ERRORS.MISSING_USER);
        this.userId = id;
        return this;
    }

    withYearly(yearly) {
        if (!yearly) throw Error(SALARY_ERRORS.MISSING_YEARLY);
        if (yearly < 0) throw Error(SALARY_ERRORS.INVALID_YEARLY);
        this.yearly = yearly;
        return this;
    }

    withPaycheck(payCheck) {
        if (!payCheck) throw Error(SALARY_ERRORS.MISSING_PAYCHECK);
        if (payCheck < 0) throw Error(SALARY_ERRORS.INVALID_PAYCHECK);
        this.payCheck = payCheck;
        return this;
    }
}

module.exports = {
    getAllSalary,
    getSalary,
    createSalary,
    editSalary
}

