/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

"use strict"

const mongoose = require("mongoose");
const ***REMOVED*** User ***REMOVED*** = require("../config/mongo");

/* Regular expressions for parameter validation. */
const NAME_REGEX = new RegExp(/^[a-zA-Z0-9]+$/);

const registerUser = async (name, password) => ***REMOVED***
    if(!name)
        throw ***REMOVED*** errors: ***REMOVED*** name: 'is required' ***REMOVED*** ***REMOVED***;
    
      if(!password) 
        throw ***REMOVED*** errors: ***REMOVED*** password: 'is required' ***REMOVED*** ***REMOVED***;
***REMOVED***

module.exports = ***REMOVED*** registerUser ***REMOVED***