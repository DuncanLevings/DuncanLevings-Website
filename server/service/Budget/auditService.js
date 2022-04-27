/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';
const { AUDIT_ERRORS } = require("../../consts/error_jsons");
const { Audit } = require("../../config/mongo");
const mongoose = require('mongoose');

const auditTypes = {
    CREATE_SALARY: 0,
    EDIT_SALARY: 1,
    CREATE_TRANSACTION: 2,
    EDIT_TRANSACTION: 3,
    DELETE_TRANSACTION: 4,
    CREATE_COMBINED_TRANSACTION: 5,
    EDIT_COMBINED_TRANSACTION: 6,
    DELETE_COMBINED_TRANSACTION: 7,
    CREATE_BUDGET: 8,
    EDIT_BUDGET: 9,
    DELETE_BUDGET: 10,
}

const getAllAudit = async () => {
    return await Audit.find();
}

const createAudit = async (userId, data) => {
    const audit = new Audit(new AuditBuilder()
        .withUser(userId)
        .withType(data.type)
        .withOld(data.old)
        .withNew(data.new)
        .withNote(data.note)
    );

    return await audit.save();
}

function validateType(type) {
    if (type < 0 || type > 10)
        throw Error(AUDIT_ERRORS.INVALID_TYPE)
}

class AuditBuilder {
    withUser(id) {
        if (!id) throw Error(AUDIT_ERRORS.MISSING_USER);
        this.userId = id;
        return this;
    }

    withType(type) {
        validateType(type)
        this.type = type;
        return this;
    }

    withOld(oldValue) {
        if (!oldValue) return this;
        this.oldValue = oldValue;
        return this;
    }

    withNew(newValue) {
        if (!newValue) return this;
        this.newValue = newValue;
        return this;
    }

    withNote(note) {
        if (!note) return this;
        this.note = note;
        return this;
    }
}

module.exports = {
    auditTypes,
    getAllAudit,
    createAudit
}
