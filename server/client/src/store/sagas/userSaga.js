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
        yield put(actionCreators.userError(error.response.data));
    }
}

function* logoutUser(logoutAction) {
    try {
        yield call(logoutAPI);
        yield put(actionCreators.logoutUserSuccess());
        yield put(push(logoutAction.redirect));
    } catch (error) {
        yield put(actionCreators.userError(error.response.data));
    }
}

function* signupUser(signupAction) {
    try {
        yield call(signUpAPI, signupAction.payload);
        yield put(actionCreators.signupUserSuccess());
        yield put(push(RSTOOL_ROUTES.LOGIN));
    } catch (error) {
        yield put(actionCreators.userError(error.response.data));
    }
}

export const userSagas = [
    takeLatest(actionTypes.GET_USER, getUser),
    takeLatest(actionTypes.LOGIN_USER, loginUser),
    takeLatest(actionTypes.LOGOUT_USER, logoutUser),
    takeLatest(actionTypes.SIGNUP_USER, signupUser)
];