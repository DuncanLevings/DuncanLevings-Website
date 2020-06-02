/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../actionTypes/userActionTypes';

// GET USER

export function getUser() {
    return { type: actionTypes.GET_USER };
}

export function getUserSuccess(user) {
    return { type: actionTypes.GET_USER_SUCCESS, payload: user };
}

// LOGIN USER

export function loginUser(authData, from) {
    return { type: actionTypes.LOGIN_USER, payload: authData, redirect: from };
}

export function loginUserSuccess(user) {
    return { type: actionTypes.LOGIN_USER_SUCCESS, payload: user };
}

// LOGOUT USER

export function logoutUser() {
    return { type: actionTypes.LOGOUT_USER };
}

export function logoutUserSuccess() {
    return { type: actionTypes.LOGOUT_USER_SUCCESS };
}

// SIGNUP USER

export function signupUser(authData) {
    return { type: actionTypes.SIGNUP_USER, payload: authData };
}

export function signupUserSuccess() {
    return { type: actionTypes.SIGNUP_USER_SUCCESS };
}

// ERROR

export function userError(error) {
    return { type: actionTypes.ERROR, payload: error };
}

export function clearAuthorization() {
    return ({ type: actionTypes.CLEAR_AUTHORIZATION });
}