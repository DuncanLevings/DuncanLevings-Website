/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

const mongoose = require('mongoose');
const { User, Token } = require('../config/mongo');
const { USER_CLIENT_ERRORS, USER_SERVER_ERRORS } = require('../consts/error_jsons');

/* Regular expressions for parameter validation. */
const NAME_REGEX = new RegExp(/^[a-zA-Z0-9]+$/);
const EMAIL_REGEX = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)

const authenticate = async (email, password, cb) => {
    User.findOne({ email: email })
        .then((user) => {
            if (!user) return cb(null, false);
            user.validatePassword(password, (err, valid) => {
                if (valid) return cb(null, user);
                return cb(USER_CLIENT_ERRORS.INCORRECT_LOGIN, false);
            });
        }).catch(cb);
}

const getUser = async (id) => {
    const user = await User.findById(id);
    if (!user) throw Error(USER_SERVER_ERRORS.USER_NOT_FOUND);
    return ({ user: user.toAuthJSON() });
}

const getUserByToken = async (token) => {
    const tkn = await Token.findOne({ "payload.token": token });
    if (!tkn) throw Error(USER_SERVER_ERRORS.TOKEN_NOT_FOUND);

    const user = await User.findById(tkn.payload.uid);
    if (!user) throw Error(USER_SERVER_ERRORS.USER_NOT_FOUND);

    return user;
}

const registerUser = async (email, username, password) => {
    if (await User.findOne({ email: email }))
        throw Error(USER_CLIENT_ERRORS.EMAIL_TAKEN);

    const user = new User(
        new UserBuilder()
            .withEmail(email)
            .withUserName(username)
            .withPassword(password));

    return await user.save();
}

const consumeRememberMeToken = (token, fn) => {
    Token.findOne({ "payload.token": token }, async (err, tkn) => {
        if (!tkn) return fn(null, null);
        await Token.deleteOne({ "payload.token": token });
        return fn(null, tkn.payload.uid);
    });
};

const saveRememberMeToken = (token, uid, fn) => {
    let tkn = new Token({
        payload: {
            uid: uid,
            token: token
        }
    });
    tkn.save();
    return fn();
};

const clearOldToken = async (token) => {
    await Token.deleteOne({ "payload.token": token });
}

const serializeUser = (user, cb) => {
    cb(null, user);
};
  
const deserializeUser = (id, cb) => {
    User.findById(id, (err, user) => {
        cb(err, user);
    });
};

class UserBuilder {
    withEmail(email) {
        if (!email) throw Error(USER_SERVER_ERRORS.EMAIL_REQUIRED);
        if (!EMAIL_REGEX.test(email)) throw Error(USER_SERVER_ERRORS.EMAIL_REGEX_FAIL);
        this.email = email;
        return this;
    }

    withUserName(username) {
        if (!username) throw Error(USER_SERVER_ERRORS.USERNAME_REQUIRED);
        if (!NAME_REGEX.test(username)) throw Error(USER_SERVER_ERRORS.USERNAME_REGEX_FAIL);
        this.username = username;
        return this;
    }

    withPassword(password) {
        if (!password) throw Error(USER_SERVER_ERRORS.PASSWORD_REQUIRED);
        if (password.length < 3)
            throw Error(USER_SERVER_ERRORS.PASSWORD_LENGTH);
        this.password = password;
        return this;
    }
}

module.exports = { 
    authenticate, 
    getUser, 
    getUserByToken,
    registerUser,
    consumeRememberMeToken,
    saveRememberMeToken,
    clearOldToken,
    serializeUser,
    deserializeUser
}
