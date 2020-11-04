/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../actionTypes/activityActionTypes';

// GET VIX WAX

export function getVixWax() {
    return { type: actionTypes.VIS_WAX };
}

export function getVixWaxSuccess(data) {
    return { type: actionTypes.VIS_WAX_SUCCESS, payload: data };
}

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
