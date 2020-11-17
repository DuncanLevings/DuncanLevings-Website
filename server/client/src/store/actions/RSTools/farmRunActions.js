/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../../actionTypes/RSTools/farmRunActionTypes';

// PRESETS

export function getFarmRun(farmRunId) {
    return { type: actionTypes.GET_FARM_RUN, payload: farmRunId };
}

export function getFarmRunSuccess(farmRun) {
    return { type: actionTypes.GET_FARM_RUN_SUCCESS, payload: farmRun };
}

export function createFarmRun(data, from) {
    return { type: actionTypes.CREATE_FARM_RUN, payload: data, redirect: from };
}

export function createFarmRunSuccess() {
    return { type: actionTypes.CREATE_FARM_RUN_SUCCESS };
}

export function editFarmRun(data, from) {
    return { type: actionTypes.EDIT_FARM_RUN, payload: data, redirect: from };
}

export function editFarmRunSuccess() {
    return { type: actionTypes.EDIT_FARM_RUN_SUCCESS };
}

// ERROR

export function clearError() {
    return { type: actionTypes.CLEAR_ERROR };
}

export function farmError(error) {
    return { type: actionTypes.ERROR, payload: error };
}
