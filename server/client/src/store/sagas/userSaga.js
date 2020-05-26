/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import ***REMOVED*** call, takeLatest, put ***REMOVED*** from 'redux-saga/effects';
import ***REMOVED*** push ***REMOVED*** from 'connected-react-router';
import ***REMOVED*** RS ***REMOVED*** from 'constants/routeConstants';
import ***REMOVED*** getUserAPI, loginAPI, logoutAPI, signUpAPI ***REMOVED*** from 'store/api/userAPI';
import * as actionTypes from 'store/actionTypes/userActionTypes'
import * as actionCreators from 'store/actions/userActions';

function* getUser() ***REMOVED***
    try ***REMOVED***
        const user = yield call(getUserAPI);
        yield put(actionCreators.getUserSuccess(user));
    ***REMOVED*** catch (error) ***REMOVED***
        if (error.response.status === 401) ***REMOVED***
            yield put(actionCreators.userError());
        ***REMOVED***
        else ***REMOVED***
            yield put(actionCreators.userError(error.response.data));
        ***REMOVED***
    ***REMOVED***
***REMOVED***

function* loginUser(loginAction) ***REMOVED***
    try ***REMOVED***
        const user = yield call(loginAPI, loginAction.payload);
        yield put(actionCreators.loginUserSuccess(user));
        yield put(push(loginAction.redirect));
    ***REMOVED*** catch (error) ***REMOVED***
        yield put(actionCreators.userError(error.response.data))
    ***REMOVED***
***REMOVED***

function* logoutUser() ***REMOVED***
    try ***REMOVED***
        yield call(logoutAPI);
        yield put(actionCreators.logoutUserSuccess());
        yield put(push(RS.LOGIN));
    ***REMOVED*** catch (error) ***REMOVED***
        yield put(actionCreators.userError(error.response.data))
    ***REMOVED***
***REMOVED***

function* signupUser(signupAction) ***REMOVED***
    try ***REMOVED***
        yield call(signUpAPI, signupAction.payload);
        yield put(actionCreators.signupUserSuccess());
        yield put(push(RS.LOGIN));
    ***REMOVED*** catch (error) ***REMOVED***
        yield put(actionCreators.userError(error.response.data))
    ***REMOVED***
***REMOVED***

export function* getUserWatcher() ***REMOVED***
    yield takeLatest(actionTypes.GET_USER, getUser);
***REMOVED***

export function* loginUserWatcher() ***REMOVED***
    yield takeLatest(actionTypes.LOGIN_USER, loginUser);
***REMOVED***

export function* logoutUserWatcher() ***REMOVED***
    yield takeLatest(actionTypes.LOGOUT_USER, logoutUser);
***REMOVED***

export function* signupUserWatcher() ***REMOVED***
    yield takeLatest(actionTypes.SIGNUP_USER, signupUser);
***REMOVED***