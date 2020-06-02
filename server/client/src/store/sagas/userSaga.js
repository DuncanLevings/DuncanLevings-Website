/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import { call, takeLatest, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import { getUserAPI, loginAPI, logoutAPI, signUpAPI } from '../api/userAPI';
import * as actionTypes from '../actionTypes/userActionTypes'
import * as actionCreators from '../actions/userActions';

function* getUser() {
    try {
        const user = yield call(getUserAPI);
        yield put(actionCreators.getUserSuccess(user));
    } catch (error) {
        if (error.response.status === 401) {
            yield put(actionCreators.userError());
        }
        else {
            yield put(actionCreators.userError(error.response.data));
        }
    }
}

function* loginUser(loginAction) {
    try {
        const user = yield call(loginAPI, loginAction.payload);
        yield put(actionCreators.loginUserSuccess(user));
        yield put(push(loginAction.redirect));
    } catch (error) {
        yield put(actionCreators.userError(error.response.data))
    }
}

function* logoutUser() {
    try {
        yield call(logoutAPI);
        yield put(actionCreators.logoutUserSuccess());
        yield put(push(RSTOOL_ROUTES.LOGIN));
    } catch (error) {
        yield put(actionCreators.userError(error.response.data))
    }
}

function* signupUser(signupAction) {
    try {
        yield call(signUpAPI, signupAction.payload);
        yield put(actionCreators.signupUserSuccess());
        yield put(push(RSTOOL_ROUTES.LOGIN));
    } catch (error) {
        yield put(actionCreators.userError(error.response.data))
    }
}

export function* getUserWatcher() {
    yield takeLatest(actionTypes.GET_USER, getUser);
}

export function* loginUserWatcher() {
    yield takeLatest(actionTypes.LOGIN_USER, loginUser);
}

export function* logoutUserWatcher() {
    yield takeLatest(actionTypes.LOGOUT_USER, logoutUser);
}

export function* signupUserWatcher() {
    yield takeLatest(actionTypes.SIGNUP_USER, signupUser);
}