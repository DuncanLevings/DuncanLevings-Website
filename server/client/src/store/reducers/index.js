/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import userReducer from './userReducer'
import notificationReducer from './Tools/notificationReducer';
import navbarReducer from './navbarReducer';
import emailReducer from './Resume/emailReducer';
import imageReducer from './Tools/imageReducer';
import dailyReducer from './RSTools/dailyReducer';
import activityReducer from './RSTools/activityReducer';
import equipmentReducer from './RSTools/equipmentReducer';
import presetReducer from './RSTools/presetReducer';
import farmRunReducer from './RSTools/farmRunReducer';
import pvmReducer from './RSTools/pvmReducer';
import bronzeManReducer from './RSTools/bronzeManReducer';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    userReducer: userReducer,
    notificationReducer: notificationReducer,
    navbarReducer: navbarReducer,
    emailReducer: emailReducer,
    imageReducer: imageReducer,
    dailyReducer: dailyReducer,
    activityReducer: activityReducer,
    equipmentReducer: equipmentReducer,
    presetReducer: presetReducer,
    farmRunReducer: farmRunReducer,
    pvmReducer: pvmReducer,
    bronzeManReducer: bronzeManReducer
});

export default createRootReducer;