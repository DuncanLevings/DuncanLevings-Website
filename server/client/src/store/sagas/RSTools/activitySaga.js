/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import { call, takeLatest, put } from 'redux-saga/effects';
import { nemiForestAPI, vixWaxAPI } from '../../api/RSTools/activityAPI';
import * as actionTypes from '../../actionTypes/RSTools/activityActionTypes'
import * as actionCreators from '../../actions/RSTools/activityActions';

function* getVixWax(activityAction) {
    try {
        const visWaxData = yield call(vixWaxAPI, activityAction.payload);
        yield put(actionCreators.getVixWaxSuccess(visWaxData));
    } catch (error) {
        yield put(actionCreators.activityError(error.response.data));
    }
}

function* getLatestNemi(activityAction) {
    try {
        const nemiData = yield call(nemiForestAPI, activityAction.payload);
        yield put(actionCreators.getLastestNemiSuccess(nemiData));
    } catch (error) {
        yield put(actionCreators.activityError(error.response.data));
    }
}

export const activitySagas = [
    takeLatest(actionTypes.VIS_WAX, getVixWax),
    takeLatest(actionTypes.NEMI_FOREST, getLatestNemi)
];