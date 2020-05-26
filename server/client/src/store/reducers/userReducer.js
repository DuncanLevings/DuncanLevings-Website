/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from 'store/actionTypes/userActionTypes';

const intialState = ***REMOVED***
    user: null,
    error: "",
    isAuthenticated: true,
    isFetching: false, // loading state
    isLogin: false // loading state
***REMOVED***;

export default (state = intialState, action) => ***REMOVED***
    switch (action.type) ***REMOVED***
        case actionTypes.GET_USER:
            return ***REMOVED***
                ...state,
                isFetching: true
            ***REMOVED***;
        case actionTypes.LOGIN_USER:
            return ***REMOVED***
                ...state,
                isLogin: true
            ***REMOVED***; 
        case actionTypes.LOGOUT_USER:
            return ***REMOVED***
                ...state
            ***REMOVED***; 
        case actionTypes.GET_USER_SUCCESS:
            return ***REMOVED***
                ...state,
                user: action.payload,
                error: "",
                isAuthenticated: true,
                isFetching: false
            ***REMOVED***;
        case actionTypes.LOGIN_USER_SUCCESS:
            return ***REMOVED***
                ...state,
                user: action.payload,
                error: "",
                isAuthenticated: true,
                isLogin: false
            ***REMOVED***;
        case actionTypes.LOGOUT_USER_SUCCESS:
            return ***REMOVED***
                ...state,
                user: null,
                error: "",
                isAuthenticated: false
            ***REMOVED***;
        case actionTypes.ERROR:
            return ***REMOVED***
                ...state,
                error: action.payload,
                isFetching: false,
                isLogin: false
            ***REMOVED***;
        default:
            return state;
    ***REMOVED***
***REMOVED***