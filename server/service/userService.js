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
const EMAIL_REGEX = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`***REMOVED***|***REMOVED***~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`***REMOVED***|***REMOVED***~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.)***REMOVED***3***REMOVED***(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)

const getUser = async (id) => ***REMOVED***
    const user = await User.findById(id);
    if (!user) throw Error("User not found!");
    return (***REMOVED*** user: user.toAuthJSON() ***REMOVED***);
***REMOVED***

const registerUser = async (email, username, password) => ***REMOVED***

    if (await User.findOne(***REMOVED*** email: email ***REMOVED***))
        throw Error("Email already exists!");
    
    const user = new User(
        new UserBuilder()
            .withEmail(email)
            .withUserName(username)
            .withPassword(password));
    
    await user.save();
    return (***REMOVED*** user: user.toAuthJSON() ***REMOVED***)
***REMOVED***

class UserBuilder ***REMOVED***
    withEmail(email) ***REMOVED***
        if (!email) throw Error("Email is required!");
        if (!EMAIL_REGEX.test(email)) throw Error("Email is invalid!");
        this.email = email;
        return this;
    ***REMOVED***

    withUserName(username) ***REMOVED***
        if (!username) throw Error("Username is required!");
        if (!NAME_REGEX.test(username)) throw Error("Username is invalid!");
        this.username = username;
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

module.exports = ***REMOVED*** getUser, registerUser ***REMOVED***