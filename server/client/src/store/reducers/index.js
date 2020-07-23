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
import emailReducer from './emailReducer';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    userReducer: userReducer,
    notificationReducer: notificationReducer,
    navbarReducer: navbarReducer,
    emailReducer: emailReducer
});

export default createRootReducer;