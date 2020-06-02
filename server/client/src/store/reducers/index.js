/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import userReducer from './userReducer'

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    userReducer: userReducer
});

export default createRootReducer;