/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../actionTypes/equipmentActionTypes';

const intialState = {
    error: "",
    items: [],
    searchItems: [],
    isFetching: false, // loading state
    isCreating: false, // loading state
    isSearching: false, // loading state
    isSaving: false, // loading state
};

export default (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ITEMS:
            return {
                ...state,
                isFetching: true
            };
        case actionTypes.SEARCH_ITEMS:
            return {
                ...state,
                isSearching: true
            };
        case actionTypes.CREATE_ITEM:
            return {
                ...state,
                isSearching: true,
                isCreating: true
            };
        case actionTypes.EDIT_ITEM:
            return {
                ...state,
                isSearching: true,
                isSaving: true
            };
        case actionTypes.DELETE_ITEM:
            return {
                ...state,
                isSearching: true,
                isSaving: true
            };
        case actionTypes.GET_ITEMS_SUCCESS:
            return {
                ...state,
                items: action.payload,
                error: "",
                isFetching: false
            };
        case actionTypes.SEARCH_ITEMS_SUCCESS:
            return {
                ...state,
                searchItems: action.payload,
                error: "",
                isSearching: false
            };
        case actionTypes.CREATE_ITEM_SUCCESS:
            return {
                ...state,
                searchItems: action.payload,
                error: "",
                isSearching: false,
                isCreating: false
            };
        case actionTypes.EDIT_ITEM_SUCCESS:
            return {
                ...state,
                searchItems: action.payload,
                error: "",
                isSearching: false,
                isSaving: false
            };
        case actionTypes.DELETE_ITEM_SUCCESS:
            return {
                ...state,
                searchItems: action.payload,
                error: "",
                isSearching: false,
                isSaving: false
            };
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: ""
            };
        case actionTypes.ERROR:
            return {
                ...state,
                error: action.payload,
                isCreating: false,
                isSaving: false,
                isFetching: false,
                isSearching: false,
            };
        default:
            return state;
    }
}