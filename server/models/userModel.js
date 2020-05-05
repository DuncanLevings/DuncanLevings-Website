/*
 * Filename: c:\Users\Duncan\Documents\personal_website\server\models\userModel.js
 * Path: c:\Users\Duncan\Documents\personal_website\server
 * Created Date: Tuesday, May 5th 2020, 3:18:46 pm
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(***REMOVED***
    userName: ***REMOVED*** type: String, required: true ***REMOVED***,
    password: ***REMOVED*** type: String, required: true ***REMOVED***,
    isAdmin: ***REMOVED*** type: Boolean, required: true, default: false ***REMOVED***
***REMOVED***);

const SALT_WORK_FACTOR = 10;

// hash the password before saving to DB
userSchema.pre("save", function (next) ***REMOVED***
    const user = this;

    if (!user.isModified("password")) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => ***REMOVED***
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => ***REMOVED***
            user.password = hash;
            next();
        ***REMOVED***);
    ***REMOVED***);
***REMOVED***);

// hash the password before updating to DB
userSchema.pre("update", function (next) ***REMOVED***
    if (!this.getUpdate().$set) return next();

    const password = this.getUpdate().$set.password;

    if (!password) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => ***REMOVED***
        if (err) return next(err);

        bcrypt.hash(password, salt, (err, hash) => ***REMOVED***
            this.getUpdate().$set.password = hash;
            next();
        ***REMOVED***);
    ***REMOVED***);
***REMOVED***);

// compare password against hashed password
userSchema.methods.comparePassword = function (password, cb) ***REMOVED***
    bcrypt.compare(password, this.password, (err, isMatch) => ***REMOVED***
        if (err) return cb(err);
        cb(null, isMatch);
    ***REMOVED***);
***REMOVED***;

userSchema.set("toJSON", ***REMOVED*** virtuals: true ***REMOVED***);
const User = mongoose.model("User", userSchema, "users");

module.exports = ***REMOVED*** User ***REMOVED***