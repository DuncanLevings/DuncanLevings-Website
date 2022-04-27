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
db.once('open', () => console.log(`connected to the database: ${db.name}`));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const { User } = require('../models/userModel');
const { Token } = require('../models/tokenModel');
const { Daily } = require('../models/RSTools/dailyModel');
const { RSToolsUser } = require('../models/RSTools/rsToolsUserModel');
const { Item } = require('../models/RSTools/itemModel');
const { AbilityBar } = require('../models/RSTools/abilityBarModel');
const { Preset } = require('../models/RSTools/presetModel');
const { FarmRun } = require('../models/RSTools/farmRunModel');
const { Activity } = require('../models/RSTools/activityModel');
const { PvM } = require('../models/RSTools/pvmModel');
const { PvmTask } = require('../models/RSTools/pvmTaskModel');
const { Budget } = require('../models/Budget/budget');
const { Salary } = require('../models/Budget/salary');
const { CombinedTransaction } = require('../models/Budget/combined');
const { Transaction } = require('../models/Budget/transaction');
const { Audit } = require('../models/Budget/audit');

module.exports = {
    User,
    Token,
    Daily,
    RSToolsUser,
    Item,
    AbilityBar,
    Preset,
    FarmRun,
    Activity,
    PvM,
    PvmTask,
    Budget,
    Salary,
    CombinedTransaction,
    Transaction,
    Audit
}