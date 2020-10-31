/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../actionTypes/dailyActionTypes';

const intialState = {
    error: "",
    dailyType: 0,
    dailyTypeName: "daily",
    dailys: [],
    searchDailys: [],
    isAdding: false, // loading state
    isSaving: false, // loading state
    isFetching: false, // loading state
    isSearching: false, // loading state
    isCreating: false, // loading state
};

export default (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.GET_DAILY:
            return {
                ...state,
                isFetching: true
            };
        case actionTypes.SEARCH_DAILY:
            return {
                ...state,
                isSearching: true
            };
        case actionTypes.ADD_DAILY:
            return {
                ...state,
                isAdding: true
            };
        case actionTypes.HIDE_DAILY:
            return {
                ...state,
                isFetching: true
            };
        case actionTypes.CREATE_DAILY:
            return {
                ...state,
                isCreating: true
            };
        case actionTypes.EDIT_DAILY:
            return {
                ...state,
                isSaving: true
            };
        case actionTypes.DELETE_DAILY:
            return {
                ...state,
                isSaving: true
            };
        case actionTypes.REORDER_DAILY:
            return {
                ...state,
                isSaving: true
            };
        case actionTypes.SET_DAILY_TYPE:
            return {
                ...state,
                dailyType: action.payload.type,
                dailyTypeName: action.payload.name
            };
        case actionTypes.GET_DAILY_SUCCESS:
            return {
                ...state,
                dailys: action.payload,
                error: "",
                isFetching: false
            };
        case actionTypes.SEARCH_DAILY_SUCCESS:
            return {
                ...state,
                searchDailys: action.payload,
                error: "",
                isSearching: false
            };
        case actionTypes.ADD_DAILY_SUCCESS:
            return {
                ...state,
                searchDailys: action.payload,
                error: "",
                isAdding: false
            };
        case actionTypes.HIDE_DAILY_SUCCESS:
            return {
                ...state,
                dailys: action.payload,
                error: "",
                isFetching: false
            };
        case actionTypes.CREATE_DAILY_SUCCESS:
            return {
                ...state,
                error: "",
                isCreating: false
            };
        case actionTypes.EDIT_DAILY_SUCCESS:
            return {
                ...state,
                error: "",
                isSaving: false
            };
        case actionTypes.DELETE_DAILY_SUCCESS:
            return {
                ...state,
                dailys: action.payload,
                error: "",
                isSaving: false
            };
        case actionTypes.REORDER_DAILY_SUCCESS:
            return {
                ...state,
                error: "",
                isSaving: false
            };
        case actionTypes.ERROR:
            return {
                ...state,
                error: action.payload,
                isCreating: false
            };
        default:
            return state;
    }
}