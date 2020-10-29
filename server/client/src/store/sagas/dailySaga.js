/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import { call, takeLatest, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { getDailyAPI, createDailyAPI } from '../api/dailyAPI';
import * as actionTypes from '../actionTypes/dailyActionTypes'
import * as actionCreators from '../actions/dailyActions';

function* getDaily(dailyAction) {
    try {
        const dailys = yield call(getDailyAPI, dailyAction.payload);
        console.log(dailys)
        yield put(actionCreators.getDailySuccess(dailys));
    } catch (error) {
        yield put(actionCreators.dailyError(error.response.data));
    }
}

function* createDaily(dailyAction) {
    try {
        yield call(createDailyAPI, dailyAction.payload);
        yield put(actionCreators.createDailySuccess());
    } catch (error) {
        if (error.response.status === 500) {
            yield put(actionCreators.dailyError("Image upload failed!"));
        } else if (error.response.status !== 401) {
            yield put(actionCreators.dailyError(error.response.data));
        }
    }
}

export function* getDailyWatcher() {
    yield takeLatest(actionTypes.GET_DAILY, getDaily);
}

export function* createDailyWatcher() {
    yield takeLatest(actionTypes.CREATE_DAILY, createDaily);
}
