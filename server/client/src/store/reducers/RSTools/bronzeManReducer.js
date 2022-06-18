/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../../actionTypes/RSTools/bronzeManActionTypes';

const intialState = {
    error: "",
    items: [],
    isFetching: false, // loading state
    isCreating: false, // loading state
};

export default (state = intialState, action) => {
    switch (action.type) {
        // ITEMS
        case actionTypes.GET_BRONZE_MAN_ITEMS:
            return {
                ...state,
                isFetching: true
            };
        case actionTypes.SET_ACQUIRED:
            return {
                ...state
            };
        case actionTypes.CREATE_BRONZE_MAN_ITEM:
            return {
                ...state,
                isCreating: true
            };
        case actionTypes.DELETE_BRONZE_MAN_ITEM:
            return {
                ...state
            };
        // ITEMS
        case actionTypes.GET_BRONZE_MAN_ITEMS_SUCCESS:
            return {
                ...state,
                items: action.payload,
                error: "",
                isFetching: false
            };
        case actionTypes.SET_ACQUIRED_SUCCESS:
            return {
                ...state,
                error: ""
            };
        case actionTypes.CREATE_BRONZE_MAN_ITEM_SUCCESS:
            return {
                ...state,
                error: "",
                isCreating: false
            };
        case actionTypes.DELETE_BRONZE_MAN_ITEM_SUCCESS:
            return {
                ...state,
                error: ""
            };
        // ERRORS
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: ""
            };
        case actionTypes.ERROR:
            return {
                ...state,
                error: action.payload,
                isFetching: false,
                isCreating: false
            };
        default:
            return state;
    }
}