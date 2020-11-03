/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import { call, takeLatest, put } from 'redux-saga/effects';
import { uploadAPI } from '../api/imageAPI';
import * as actionTypes from '../actionTypes/imageActionTypes'
import * as actionCreators from '../actions/imageActions';

function* upload(imageAction) {
    try {
        yield call(uploadAPI, imageAction.payload);
        yield put(actionCreators.uploadSuccess());
    } catch (error) {
        yield put(actionCreators.imageError(error.response.data));
    }
}

export const imageSagas = [
    takeLatest(actionTypes.UPLOAD, upload)
];