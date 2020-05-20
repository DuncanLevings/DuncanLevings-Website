/*
 * Filename: c:\Users\Duncan\Documents\personal_website\server\client\src\reducers\index.js
 * Path: c:\Users\Duncan\Documents\personal_website\server\client
 * Created Date: Wednesday, May 20th 2020, 2:11:31 pm
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import ***REMOVED*** combineReducers ***REMOVED*** from 'redux'
import ***REMOVED*** connectRouter ***REMOVED*** from 'connected-react-router'
import userReducer from 'reducers/userReducer'

const createRootReducer = (history) => combineReducers(***REMOVED***
    router: connectRouter(history),
    userReducer: userReducer
***REMOVED***);

export default createRootReducer;