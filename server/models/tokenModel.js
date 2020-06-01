/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

"use strict";

const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  payload: { type: mongoose.Schema.Types.Mixed, required: true }
});

const Token = mongoose.model("Token", tokenSchema, "Tokens");

module.exports = { Token };