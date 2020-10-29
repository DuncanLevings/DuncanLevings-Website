/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../actionTypes/dailyActionTypes';

// RETRIEVE

export function getDaily(type) {
    return { type: actionTypes.GET_DAILY, payload: type };
}

export function getDailySuccess(dailys) {
    return { type: actionTypes.GET_DAILY_SUCCESS, payload: dailys };
}

// CREATE

export function createDaily(formData) {
    return { type: actionTypes.CREATE_DAILY, payload: formData };
}

export function createDailySuccess() {
    return { type: actionTypes.CREATE_DAILY_SUCCESS };
}

// type

export function setDailyType(type) {
    return { type: actionTypes.SET_DAILY_TYPE, payload: type };
}

// ERROR

export function dailyError(error) {
    return { type: actionTypes.ERROR, payload: error };
}
