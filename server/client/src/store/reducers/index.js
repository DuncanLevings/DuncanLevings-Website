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
import imageReducer from './imageReducer';
import dailyReducer from './dailyReducer';
import activityReducer from './activityReducer';
import equipmentReducer from './equipmentReducer';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    userReducer: userReducer,
    notificationReducer: notificationReducer,
    navbarReducer: navbarReducer,
    emailReducer: emailReducer,
    imageReducer: imageReducer,
    dailyReducer: dailyReducer,
    activityReducer: activityReducer,
    equipmentReducer: equipmentReducer
});

export default createRootReducer;