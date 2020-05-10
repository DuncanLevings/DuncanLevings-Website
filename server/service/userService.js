/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

"use strict";

const mongoose = require("mongoose");
const ***REMOVED*** User ***REMOVED*** = require("../config/mongo");

/* Regular expressions for parameter validation. */
const NAME_REGEX = new RegExp(/^[a-zA-Z0-9]+$/);

const registerUser = async (name, password) => ***REMOVED***

    if (await User.findOne(***REMOVED*** name: name ***REMOVED***))
        throw Error("name already exists!");
    
    const user = new User(
        new UserBuilder()
            .withName(name)
            .withPassword(password));
    
    await user.save();
    return (***REMOVED*** user: user.toAuthJSON() ***REMOVED***)
***REMOVED***

class UserBuilder ***REMOVED***
    withName(name) ***REMOVED***
        if (!name) throw Error("name is required!");
        if (!NAME_REGEX.test(name)) throw Error("name is invalid!");
        this.name = name;
        return this;
    ***REMOVED***

    withPassword(password) ***REMOVED***
        if (!password) throw Error("password is required!");
        if (password.length < 3)
            throw Error("password must be more than 3 characters!");
        this.password = password;
        return this;
    ***REMOVED***
***REMOVED***

module.exports = ***REMOVED*** registerUser ***REMOVED***