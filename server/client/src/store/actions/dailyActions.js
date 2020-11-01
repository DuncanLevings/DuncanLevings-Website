/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../actionTypes/dailyActionTypes';

// RESET

export function checkReset() {
    return { type: actionTypes.CHECK_RESET };
}

export function checkResetSuccess(refresh) {
    return { type: actionTypes.CHECK_RESET_SUCCESS, payload: refresh };
}

export function setRefresh(bool) {
    return { type: actionTypes.SET_REFRESH, payload: bool };
}

// RETRIEVE

export function getDaily(type) {
    return { type: actionTypes.GET_DAILY, payload: type };
}

export function getDailySuccess(dailys) {
    return { type: actionTypes.GET_DAILY_SUCCESS, payload: dailys };
}

export function getWeekly(type) {
    return { type: actionTypes.GET_WEEKLY, payload: type };
}

export function getWeeklySuccess(weeklys) {
    return { type: actionTypes.GET_WEEKLY_SUCCESS, payload: weeklys };
}

export function getMonthly(type) {
    return { type: actionTypes.GET_MONTHLY, payload: type };
}

export function getMonthlySuccess(monthlys) {
    return { type: actionTypes.GET_MONTHLY_SUCCESS, payload: monthlys };
}

// RETRIEVE SINGLE

export function getSingleDaily(dailyId) {
    return { type: actionTypes.GET_SINGLE_DAILY, payload: dailyId };
}

export function getSingleDailySuccess(daily) {
    return { type: actionTypes.GET_SINGLE_DAILY_SUCCESS, payload: daily };
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

export function hideWeekly(dailyId) {
    return { type: actionTypes.HIDE_WEEKLY, payload: {id: dailyId } };
}

export function hideWeeklySuccess(weeklys) {
    return { type: actionTypes.HIDE_WEEKLY_SUCCESS, payload: weeklys };
}

export function hideMonthly(dailyId) {
    return { type: actionTypes.HIDE_MONTHLY, payload: {id: dailyId } };
}

export function hideMonthlySuccess(monthlys) {
    return { type: actionTypes.HIDE_MONTHLY_SUCCESS, payload: monthlys };
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

export function deleteWeekly(dailyId) {
    return { type: actionTypes.DELETE_WEEKLY, payload: dailyId };
}

export function deleteWeeklySuccess(weeklys) {
    return { type: actionTypes.DELETE_WEEKLY_SUCCESS, payload: weeklys };
}

export function deleteMonthly(dailyId) {
    return { type: actionTypes.DELETE_MONTHLY, payload: dailyId };
}

export function deleteMonthlySuccess(monthlys) {
    return { type: actionTypes.DELETE_MONTHLY_SUCCESS, payload: monthlys };
}

// ORDER

export function reorderDaily(list, type) {
    return { type: actionTypes.REORDER_DAILY, payload: { dailyList: list, type: type } };
}

export function reorderDailySuccess(dailys) {
    return { type: actionTypes.REORDER_DAILY_SUCCESS, payload: dailys };
}

// COMPLETE

export function completeDaily(id, type) {
    return { type: actionTypes.COMPLETE_DAILY, payload: { id: id, type: type } };
}

export function completeDailySuccess(dailys) {
    return { type: actionTypes.COMPLETE_DAILY_SUCCESS, payload: dailys };
}

export function completeWeekly(id, type) {
    return { type: actionTypes.COMPLETE_WEEKLY, payload: { id: id, type: type } };
}

export function completeWeeklySuccess(weeklys) {
    return { type: actionTypes.COMPLETE_WEEKLY_SUCCESS, payload: weeklys };
}

export function completeMonthly(id, type) {
    return { type: actionTypes.COMPLETE_MONTHLY, payload: { id: id, type: type } };
}

export function completeMonthlySuccess(monthlys) {
    return { type: actionTypes.COMPLETE_MONTHLY_SUCCESS, payload: monthlys };
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
