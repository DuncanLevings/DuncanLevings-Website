/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import { call, takeLatest, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
    getDailyAPI,
    getSingleDailyAPI,
    createDailyAPI,
    editDailyAPI,
    deleteDailyAPI,
    reorderDailyAPI,
    searchDailyAPI,
    addDailyAPI,
    hideDailyAPI,
    completeDailyAPI,
    checkResetAPI
} from '../api/dailyAPI';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import * as actionTypes from '../actionTypes/dailyActionTypes'
import * as actionCreators from '../actions/dailyActions';

function* checkReset() {
    try {
        const refresh = yield call(checkResetAPI);
        yield put(actionCreators.checkResetSuccess(refresh));
    } catch (error) {
        yield put(actionCreators.dailyError(error.response.data));
    }
}

function* getDaily(dailyAction) {
    try {
        const dailys = yield call(getDailyAPI, dailyAction.payload);
        yield put(actionCreators.getDailySuccess(dailys));
    } catch (error) {
        yield put(actionCreators.dailyError(error.response.data));
    }
}

function* getWeekly(dailyAction) {
    try {
        const weeklys = yield call(getDailyAPI, dailyAction.payload);
        yield put(actionCreators.getWeeklySuccess(weeklys));
    } catch (error) {
        yield put(actionCreators.dailyError(error.response.data));
    }
}

function* getMonthly(dailyAction) {
    try {
        const monthlys = yield call(getDailyAPI, dailyAction.payload);
        yield put(actionCreators.getMonthlySuccess(monthlys));
    } catch (error) {
        yield put(actionCreators.dailyError(error.response.data));
    }
}

function* getSingleDaily(dailyAction) {
    try {
        const daily = yield call(getSingleDailyAPI, dailyAction.payload);
        yield put(actionCreators.getSingleDailySuccess(daily));
    } catch (error) {
        yield put(actionCreators.dailyError(error.response.data));
    }
}

function* searchDaily(dailyAction) {
    try {
        const dailys = yield call(searchDailyAPI, dailyAction.payload.type, dailyAction.payload.filter);
        yield put(actionCreators.searchDailySuccess(dailys));
    } catch (error) {
        yield put(actionCreators.dailyError(error.response.data));
    }
}

function* addDaily(dailyAction) {
    try {
        const dailys = yield call(addDailyAPI, dailyAction.payload);
        yield put(actionCreators.addDailySuccess(dailys));
    } catch (error) {
        yield put(actionCreators.dailyError(error.response.data));
    }
}

function* hideDaily(dailyAction) {
    try {
        const dailys = yield call(hideDailyAPI, dailyAction.payload);
        yield put(actionCreators.hideDailySuccess(dailys));
    } catch (error) {
        yield put(actionCreators.dailyError(error.response.data));
    }
}

function* hideWeekly(dailyAction) {
    try {
        const weeklys = yield call(hideDailyAPI, dailyAction.payload);
        yield put(actionCreators.hideWeeklySuccess(weeklys));
    } catch (error) {
        yield put(actionCreators.dailyError(error.response.data));
    }
}

function* hideMonthly(dailyAction) {
    try {
        const monthlys = yield call(hideDailyAPI, dailyAction.payload);
        yield put(actionCreators.hideMonthlySuccess(monthlys));
    } catch (error) {
        yield put(actionCreators.dailyError(error.response.data));
    }
}

function* createDaily(dailyAction) {
    try {
        yield call(createDailyAPI, dailyAction.payload);
        yield put(actionCreators.createDailySuccess());
        yield put(push(RSTOOL_ROUTES.DAILYS));
    } catch (error) {
        if (error.response.status === 500) {
            yield put(actionCreators.dailyError("Image upload failed!"));
        } else if (error.response.status !== 401) {
            yield put(actionCreators.dailyError(error.response.data));
        }
    }
}

function* editDaily(dailyAction) {
    try {
        yield call(editDailyAPI, dailyAction.payload);
        yield put(actionCreators.editDailySuccess());
        yield put(push(RSTOOL_ROUTES.DAILYS));
    } catch (error) {
        if (error.response.status === 500) {
            yield put(actionCreators.dailyError("Image upload failed!"));
        } else if (error.response.status !== 401) {
            yield put(actionCreators.dailyError(error.response.data));
        }
    }
}

function* deleteDaily(dailyAction) {
    try {
        const dailys = yield call(deleteDailyAPI, dailyAction.payload);
        yield put(actionCreators.deleteDailySuccess(dailys));
    } catch (error) {
        yield put(actionCreators.dailyError(error.response.data));
    }
}

function* deleteWeekly(dailyAction) {
    try {
        const weeklys = yield call(deleteDailyAPI, dailyAction.payload);
        yield put(actionCreators.deleteWeeklySuccess(weeklys));
    } catch (error) {
        yield put(actionCreators.dailyError(error.response.data));
    }
}

function* deleteMonthly(dailyAction) {
    try {
        const monthlys = yield call(deleteDailyAPI, dailyAction.payload);
        yield put(actionCreators.deleteMonthlySuccess(monthlys));
    } catch (error) {
        yield put(actionCreators.dailyError(error.response.data));
    }
}

function* reorderDaily(dailyAction) {
    try {
        const dailys = yield call(reorderDailyAPI, dailyAction.payload);
        yield put(actionCreators.reorderDailySuccess(dailys));
        yield put(push(RSTOOL_ROUTES.DAILYS));
    } catch (error) {
        yield put(actionCreators.dailyError(error.response.data));
    }
}

function* completeDaily(dailyAction) {
    try {
        const dailys = yield call(completeDailyAPI, dailyAction.payload);
        yield put(actionCreators.completeDailySuccess(dailys));
    } catch (error) {
        yield put(actionCreators.dailyError(error.response.data));
    }
}

function* completeWeekly(dailyAction) {
    try {
        const weeklys = yield call(completeDailyAPI, dailyAction.payload);
        yield put(actionCreators.completeWeeklySuccess(weeklys));
    } catch (error) {
        yield put(actionCreators.dailyError(error.response.data));
    }
}

function* completeMonthy(dailyAction) {
    try {
        const monthlys = yield call(completeDailyAPI, dailyAction.payload);
        yield put(actionCreators.completeMonthlySuccess(monthlys));
    } catch (error) {
        yield put(actionCreators.dailyError(error.response.data));
    }
}

export function* checkResetWatcher() {
    yield takeLatest(actionTypes.CHECK_RESET, checkReset);
}

export function* getDailyWatcher() {
    yield takeLatest(actionTypes.GET_DAILY, getDaily);
}

export function* getWeeklyWatcher() {
    yield takeLatest(actionTypes.GET_WEEKLY, getWeekly);
}

export function* getMonthlyWatcher() {
    yield takeLatest(actionTypes.GET_MONTHLY, getMonthly);
}

export function* getSingleDailyWatcher() {
    yield takeLatest(actionTypes.GET_SINGLE_DAILY, getSingleDaily);
}

export function* searchDailyWatcher() {
    yield takeLatest(actionTypes.SEARCH_DAILY, searchDaily);
}

export function* addDailyWatcher() {
    yield takeLatest(actionTypes.ADD_DAILY, addDaily);
}

export function* hideDailyWatcher() {
    yield takeLatest(actionTypes.HIDE_DAILY, hideDaily);
}

export function* hideWeeklyWatcher() {
    yield takeLatest(actionTypes.HIDE_WEEKLY, hideWeekly);
}

export function* hideMonthlyWatcher() {
    yield takeLatest(actionTypes.HIDE_MONTHLY, hideMonthly);
}

export function* createDailyWatcher() {
    yield takeLatest(actionTypes.CREATE_DAILY, createDaily);
}

export function* editDailyWatcher() {
    yield takeLatest(actionTypes.EDIT_DAILY, editDaily);
}

export function* deleteDailyWatcher() {
    yield takeLatest(actionTypes.DELETE_DAILY, deleteDaily);
}

export function* deleteWeeklyWatcher() {
    yield takeLatest(actionTypes.DELETE_WEEKLY, deleteWeekly);
}

export function* deleteMonthlyWatcher() {
    yield takeLatest(actionTypes.DELETE_MONTHLY, deleteMonthly);
}

export function* reorderDailyWatcher() {
    yield takeLatest(actionTypes.REORDER_DAILY, reorderDaily);
}

export function* completeDailyWatcher() {
    yield takeLatest(actionTypes.COMPLETE_DAILY, completeDaily);
}

export function* completeWeeklyWatcher() {
    yield takeLatest(actionTypes.COMPLETE_WEEKLY, completeWeekly);
}

export function* completeMonthlyWatcher() {
    yield takeLatest(actionTypes.COMPLETE_MONTHLY, completeMonthy);
}