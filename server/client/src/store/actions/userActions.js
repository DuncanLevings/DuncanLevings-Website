/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from 'store/actionTypes/userActionTypes';

// GET USER

export function getUser() ***REMOVED***
    return ***REMOVED*** type: actionTypes.GET_USER ***REMOVED***;
***REMOVED***

export function getUserSuccess(user) ***REMOVED***
    return ***REMOVED*** type: actionTypes.GET_USER_SUCCESS, payload: user ***REMOVED***;
***REMOVED***

// LOGIN USER

export function loginUser(authData, from) ***REMOVED***
    return ***REMOVED*** type: actionTypes.LOGIN_USER, payload: authData, redirect: from ***REMOVED***;
***REMOVED***

export function loginUserSuccess(user) ***REMOVED***
    return ***REMOVED*** type: actionTypes.LOGIN_USER_SUCCESS, payload: user ***REMOVED***;
***REMOVED***

// LOGOUT USER

export function logoutUser() ***REMOVED***
    return ***REMOVED*** type: actionTypes.LOGOUT_USER ***REMOVED***;
***REMOVED***

export function logoutUserSuccess() ***REMOVED***
    return ***REMOVED*** type: actionTypes.LOGOUT_USER_SUCCESS ***REMOVED***;
***REMOVED***

// ERROR

export function userError(error) ***REMOVED***
    return ***REMOVED*** type: actionTypes.ERROR, payload: error ***REMOVED***;
***REMOVED***

export function clearAuthorization() ***REMOVED***
    return (***REMOVED*** type: actionTypes.CLEAR_AUTHORIZATION ***REMOVED***);
***REMOVED***