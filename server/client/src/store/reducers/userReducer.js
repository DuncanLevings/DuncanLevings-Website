/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from 'store/actionTypes/userActionTypes';

const intialState = {
    user: null,
    error: "",
    isAuthenticated: true,
    isFetching: false, // loading state
    isLogin: false, // loading state
    isSignup: false // loading state
};

export default (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USER:
            return {
                ...state,
                isFetching: true
            };
        case actionTypes.LOGIN_USER:
            return {
                ...state,
                isLogin: true
            }; 
        case actionTypes.LOGOUT_USER:
            return {
                ...state
            }; 
        case actionTypes.SIGNUP_USER:
            return {
                ...state,
                isSignup: true
            }; 
        case actionTypes.GET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: "",
                isAuthenticated: true,
                isFetching: false
            };
        case actionTypes.LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: "",
                isAuthenticated: true,
                isLogin: false
            };
        case actionTypes.LOGOUT_USER_SUCCESS:
            return {
                ...state,
                user: null,
                error: "",
                isAuthenticated: false
            };
        case actionTypes.SIGNUP_USER_SUCCESS:
            return {
                ...state,
                error: "",
                isSignup: false
            };
        case actionTypes.ERROR:
            return {
                ...state,
                error: action.payload,
                isFetching: false,
                isLogin: false,
                isSignup: false
            };
        default:
            return state;
    }
}