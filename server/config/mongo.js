/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

"use strict";

const ***REMOVED*** mongoDB, mongoDBLocal ***REMOVED*** = require("../config.json");
const mongoose = require("mongoose");

let connString = mongoDB;
if (process.env.NODE_ENV !== 'production') ***REMOVED***
    connString = mongoDBLocal
***REMOVED***

mongoose.connect(connString, ***REMOVED***
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    replicaSet: "duncanlevings-shard-0",
    connectTimeoutMS: 864000000
***REMOVED***);

let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const ***REMOVED*** User ***REMOVED*** = require("../models/userModel");

module.exports = ***REMOVED***
    User
***REMOVED***