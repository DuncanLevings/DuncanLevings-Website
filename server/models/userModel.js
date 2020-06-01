/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/config.json");
const { ACCESS_TOKEN_TTL } = require("../constants/config_consts");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }
});

const SALT_WORK_FACTOR = 10;

// hash the password before saving to DB
userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        });
    });
});

// hash the password before updating to DB
userSchema.pre("update", function (next) {
    if (!this.getUpdate().$set) return next();

    const password = this.getUpdate().$set.password;

    if (!password) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(password, salt, (err, hash) => {
            this.getUpdate().$set.password = hash;
            next();
        });
    });
});

// validate password against hashed password
userSchema.methods.validatePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.methods.generateJWT = function () {
    return jwt.sign({
        id: this._id,
        isAdmin: this.isAdmin,
    }, secret, { expiresIn: ACCESS_TOKEN_TTL });
}

userSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        username: this.username,
        isAdmin: this.isAdmin
    };
};

userSchema.set("toJSON", { virtuals: true });
const User = mongoose.model("User", userSchema, "users");

module.exports = { User }