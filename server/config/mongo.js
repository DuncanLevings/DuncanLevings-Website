/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

"use strict";

const { mongoDB, mongoDBLocal } = require('./config.json');
const mongoose = require('mongoose');

let connString = mongoDB;
if (process.env.NODE_ENV !== 'production') {
    connString = mongoDBLocal
}

mongoose.connect(connString, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    replicaSet: 'duncanlevings-shard-0',
    connectTimeoutMS: 864000000
});

let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const { User } = require('../models/userModel');
const { Token } = require('../models/tokenModel');
const { Daily } = require('../models/dailyModel');
const { RSToolsUser } = require('../models/rsToolsUserModel');

module.exports = {
    User,
    Token,
    Daily,
    RSToolsUser
}