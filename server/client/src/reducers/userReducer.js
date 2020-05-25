/*
 * Filename: c:\Users\Duncan\Documents\personal_website\server\client\src\reducers\userReducer.js
 * Path: c:\Users\Duncan\Documents\personal_website\server\client
 * Created Date: Wednesday, May 20th 2020, 3:29:21 pm
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from 'actionTypes/userActionTypes';

const intialState = ***REMOVED***
    user: null,
    error: "",
    isFetching: false
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
                isFetching: true
            ***REMOVED***; 
        case actionTypes.LOGOUT_USER:
            return ***REMOVED***
                ...state,
                isFetching: true
            ***REMOVED***; 
        case actionTypes.GET_USER_SUCCESS:
            return ***REMOVED***
                ...state,
                user: action.payload,
                error: "",
                isFetching: false
            ***REMOVED***;
        case actionTypes.LOGIN_USER_SUCCESS:
            return ***REMOVED***
                ...state,
                user: action.payload,
                error: "",
                isFetching: false
            ***REMOVED***;
        case actionTypes.LOGOUT_USER_SUCCESS:
            return ***REMOVED***
                ...state,
                user: null,
                error: "",
                isFetching: false
            ***REMOVED***;
        case actionTypes.ERROR:
            return ***REMOVED***
                ...state,
                error: action.payload,
                isFetching: false
            ***REMOVED***;
        default:
            return state;
    ***REMOVED***
***REMOVED***