/*
 * Filename: c:\Users\Duncan\Documents\personal_website\server\models\tokenModel.js
 * Path: c:\Users\Duncan\Documents\personal_website\server
 * Created Date: Tuesday, May 12th 2020, 2:52:05 pm
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

"use strict";

const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(***REMOVED***
  payload: ***REMOVED*** type: mongoose.Schema.Types.Mixed, required: true ***REMOVED***
***REMOVED***);

const Token = mongoose.model("Token", tokenSchema, "Tokens");

module.exports = ***REMOVED*** Token ***REMOVED***;