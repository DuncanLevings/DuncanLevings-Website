/*
 * Filename: c:\Users\Duncan\Documents\personal_website\server\service\mongoService
 * Path: c:\Users\Duncan\Documents\personal_website\server
 * Created Date: Monday, May 4th 2020, 4:13:49 pm
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

const ***REMOVED*** mongoDB ***REMOVED*** = require("../config.json");
const mongoose = require("mongoose");

mongoose.connect(mongoDB, ***REMOVED***
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