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

// SEARCH

export function searchDaily(type, filter) {
    return { type: actionTypes.SEARCH_DAILY, payload: { type: type, filter: filter} };
}

export function searchDailySuccess(dailys) {
    return { type: actionTypes.SEARCH_DAILY_SUCCESS, payload: dailys };
}

// ADD

export function addDaily(dailyId, type, filter) {
    return { type: actionTypes.ADD_DAILY, payload: { id: dailyId, type: type, filter: filter } };
}

export function addDailySuccess(dailys) {
    return { type: actionTypes.ADD_DAILY_SUCCESS, payload: dailys };
}

// HIDE

export function hideDaily(dailyId) {
    return { type: actionTypes.HIDE_DAILY, payload: {id: dailyId } };
}

export function hideDailySuccess(dailys) {
    return { type: actionTypes.HIDE_DAILY_SUCCESS, payload: dailys };
}

// CREATE

export function createDaily(formData) {
    return { type: actionTypes.CREATE_DAILY, payload: formData };
}

export function createDailySuccess() {
    return { type: actionTypes.CREATE_DAILY_SUCCESS };
}

// EDIT

export function editDaily(formData) {
    return { type: actionTypes.EDIT_DAILY, payload: formData };
}

export function editDailySuccess() {
    return { type: actionTypes.EDIT_DAILY_SUCCESS };
}

// DELETE

export function deleteDaily(dailyId) {
    return { type: actionTypes.DELETE_DAILY, payload: dailyId };
}

export function deleteDailySuccess(dailys) {
    return { type: actionTypes.DELETE_DAILY_SUCCESS, payload: dailys };
}

// ORDER

export function reorderDaily(formData) {
    return { type: actionTypes.REORDER_DAILY, payload: formData };
}

export function reorderDailySuccess() {
    return { type: actionTypes.REORDER_DAILY_SUCCESS };
}

// type

export function setDailyType(type) {
    let name = "Daily";
    switch (type) {
        case 1:
            name = "Weekly";
            break;
        case 2:
            name = "Monthly";
            break;
        default:
            break;
    }
    return { type: actionTypes.SET_DAILY_TYPE, payload: { type: type, name: name } };
}

// ERROR

export function dailyError(error) {
    return { type: actionTypes.ERROR, payload: error };
}
