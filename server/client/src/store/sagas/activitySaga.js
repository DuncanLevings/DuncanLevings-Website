/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import { call, takeLatest, put } from 'redux-saga/effects';
import { nemiForestAPI } from '../api/activityAPI';
import * as actionTypes from '../actionTypes/activityActionTypes'
import * as actionCreators from '../actions/activityActions';

function* getLatestNemi(activityAction) {
    try {
        const nemiData = yield call(nemiForestAPI, activityAction.payload);
        yield put(actionCreators.getLastestNemiSuccess(nemiData));
    } catch (error) {
        yield put(actionCreators.activityError(error.response.data));
    }
}

export const activitySagas = [
    takeLatest(actionTypes.NEMI_FOREST, getLatestNemi)
];