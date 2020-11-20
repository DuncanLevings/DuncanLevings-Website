/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import { call, takeLatest, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { 
    createActivityAPI,
    deleteActivityAPI,
    editActivityAPI,
    getActivitiesAPI, 
    getActivitySingleAPI, 
    nemiForestAPI, 
    vixWaxAPI } from '../../api/RSTools/activityAPI';
import * as actionTypes from '../../actionTypes/RSTools/activityActionTypes'
import * as actionCreators from '../../actions/RSTools/activityActions';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';

function* getActivities() {
    try {
        const activities = yield call(getActivitiesAPI);
        yield put(actionCreators.getActivitiesSuccess(activities));
    } catch (error) {
        yield put(actionCreators.activityError(error.response.data));
    }
}

function* getActivitySingle(activityAction) {
    try {
        const activity = yield call(getActivitySingleAPI, activityAction.payload);
        yield put(actionCreators.getActivitySingleSuccess(activity));
    } catch (error) {
        yield put(actionCreators.activityError(error.response.data));
    }
}

function* createActivity(activityAction) {
    try {
        yield call(createActivityAPI, activityAction.payload);
        yield put(actionCreators.createActivitySuccess());
        yield put(push(RSTOOL_ROUTES.ACTIVITY));
    } catch (error) {
        yield put(actionCreators.activityError(error.response.data));
    }
}

function* editActivity(activityAction) {
    try {
        yield call(editActivityAPI, activityAction.payload);
        yield put(actionCreators.editActivitySuccess());
        yield put(push(RSTOOL_ROUTES.ACTIVITY));
    } catch (error) {
        yield put(actionCreators.activityError(error.response.data));
    }
}

function* deleteActivity(activityAction) {
    try {
        const activities = yield call(deleteActivityAPI, activityAction.payload);
        yield put(actionCreators.deleteActivitySuccess(activities));
    } catch (error) {
        yield put(actionCreators.activityError(error.response.data));
    }
}

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
    takeLatest(actionTypes.GET_ACTIVITIES, getActivities),
    takeLatest(actionTypes.GET_ACTIVITY_SINGLE, getActivitySingle),
    takeLatest(actionTypes.CREATE_ACTIVITY, createActivity),
    takeLatest(actionTypes.EDIT_ACTIVITY, editActivity),
    takeLatest(actionTypes.DELETE_ACTIVITY, deleteActivity),
    takeLatest(actionTypes.VIS_WAX, getVixWax),
    takeLatest(actionTypes.NEMI_FOREST, getLatestNemi)
];