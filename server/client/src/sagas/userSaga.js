/*
 * Filename: c:\Users\Duncan\Documents\personal_website\server\client\src\sagas\userSaga.js
 * Path: c:\Users\Duncan\Documents\personal_website\server\client
 * Created Date: Wednesday, May 20th 2020, 4:05:12 pm
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import ***REMOVED*** call, takeLatest, put ***REMOVED*** from 'redux-saga/effects';
import ***REMOVED*** push ***REMOVED*** from 'connected-react-router';
import ***REMOVED*** getUserAPI, loginAPI ***REMOVED*** from 'api/userAPI';
import * as actionTypes from 'actionTypes/userActionTypes'
import * as actionCreators from 'actions/userActions';

function* getUser() ***REMOVED***
    try ***REMOVED***
        const user = yield call(getUserAPI);
        yield put(actionCreators.getUserSuccess(user));
    ***REMOVED*** catch (error) ***REMOVED***
        yield put(actionCreators.userError(error.response.data))
    ***REMOVED***
***REMOVED***

function* loginUser(loginAction) ***REMOVED***
    try ***REMOVED***
        const user = yield call(loginAPI, loginAction.payload);
        yield put(actionCreators.loginUserSuccess(user));
        yield put(push('/home'));
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