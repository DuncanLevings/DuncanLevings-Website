/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import userReducer from './userReducer'
import notificationReducer from './notificationReducer';
import navbarReducer from './navbarReducer';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    userReducer: userReducer,
    notificationReducer: notificationReducer,
    navbarReducer: navbarReducer
});

export default createRootReducer;