/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../actionTypes/activityActionTypes';

// GET NEMI FOREST

export function getLastestNemi() {
    return { type: actionTypes.NEMI_FOREST };
}

export function getLastestNemiSuccess(data) {
    return { type: actionTypes.NEMI_FOREST_SUCCESS, payload: data };
}

// ERROR

export function activityError(error) {
    return { type: actionTypes.ERROR, payload: error };
}
