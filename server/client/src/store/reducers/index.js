/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import ***REMOVED*** combineReducers ***REMOVED*** from 'redux'
import ***REMOVED*** connectRouter ***REMOVED*** from 'connected-react-router'
import userReducer from 'store/reducers/userReducer'

const createRootReducer = (history) => combineReducers(***REMOVED***
    router: connectRouter(history),
    userReducer: userReducer
***REMOVED***);

export default createRootReducer;