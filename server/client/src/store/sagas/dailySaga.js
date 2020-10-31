/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import { call, takeLatest, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { getDailyAPI, createDailyAPI, editDailyAPI, deleteDailyAPI, reorderDailyAPI, searchDailyAPI, addDailyAPI, hideDailyAPI } from '../api/dailyAPI';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import * as actionTypes from '../actionTypes/dailyActionTypes'
import * as actionCreators from '../actions/dailyActions';

function* getDaily(dailyAction) {
    try {
        const dailys = yield call(getDailyAPI, dailyAction.payload);
        yield put(actionCreators.getDailySuccess(dailys));
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
        console.log(dailyAction)
        const dailys = yield call(hideDailyAPI, dailyAction.payload);
        yield put(actionCreators.hideDailySuccess(dailys));
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

function* reorderDaily(dailyAction) {
    // try {
    //     yield call(reorderDailyAPI, dailyAction.payload);
    //     yield put(actionCreators.reorderDailySuccess());
    // } catch (error) {
    //     yield put(actionCreators.dailyError(error.response.data));
    // }
}

export function* getDailyWatcher() {
    yield takeLatest(actionTypes.GET_DAILY, getDaily);
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

export function* createDailyWatcher() {
    yield takeLatest(actionTypes.CREATE_DAILY, createDaily);
}

export function* editDailyWatcher() {
    yield takeLatest(actionTypes.EDIT_DAILY, editDaily);
}

export function* deleteDailyWatcher() {
    yield takeLatest(actionTypes.DELETE_DAILY, deleteDaily);
}

export function* reorderDailyWatcher() {
    yield takeLatest(actionTypes.REORDER_DAILY, reorderDaily);
}