/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import { call, takeLatest, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
    createFarmRunAPI,
    editFarmRunAPI,
    getFarmRunAPI
} from '../../api/RSTools/farmRunAPI';
import * as actionTypes from '../../actionTypes/RSTools/farmRunActionTypes'
import * as actionCreators from '../../actions/RSTools/farmRunActions';

function* getFarmRun(farmRunAction) {
    try {
        const farmRun = yield call(getFarmRunAPI, farmRunAction.payload);
        yield put(actionCreators.getFarmRunSuccess(farmRun));
    } catch (error) {
        yield put(actionCreators.farmError(error.response.data));
    }
}

function* createFarmRun(farmRunAction) {
    try {
        yield call(createFarmRunAPI, farmRunAction.payload);
        yield put(actionCreators.createFarmRunSuccess());
        if (farmRunAction.redirect) yield put(push(farmRunAction.redirect));
    } catch (error) {
        if (error.response.status === 500) {
            yield put(actionCreators.farmError("Image upload failed!"));
        } else if (error.response.status !== 401) {
            yield put(actionCreators.farmError(error.response.data));
        }
    }
}

function* editFarmRun(farmRunAction) {
    try {
        yield call(editFarmRunAPI, farmRunAction.payload);
        yield put(actionCreators.editFarmRunSuccess());
        if (farmRunAction.redirect) yield put(push(farmRunAction.redirect));
    } catch (error) {
        yield put(actionCreators.farmError(error.response.data));
    }
}

export const farmRunSagas = [
    takeLatest(actionTypes.GET_FARM_RUN, getFarmRun),
    takeLatest(actionTypes.CREATE_FARM_RUN, createFarmRun),
    takeLatest(actionTypes.EDIT_FARM_RUN, editFarmRun)
];