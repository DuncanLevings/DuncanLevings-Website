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
    editItemObj: null,
    editAbilityBarObj: null,
    searchAbilityBars: [],
    isFetching: false, // loading state
    isCreating: false, // loading state
    isSearching: false, // loading state
    isSaving: false, // loading state
};

export default (state = intialState, action) => {
    switch (action.type) {
        // ITEMS
        case actionTypes.GET_ITEMS:
            return {
                ...state,
                isFetching: true
            };
        case actionTypes.GET_ITEM_SINGLE:
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
        // ABILITYS
        case actionTypes.GET_ABILITY_BAR_SINGLE:
            return {
                ...state,
                isFetching: true
            };
        case actionTypes.SEARCH_ABILITY_BARS:
            return {
                ...state,
                isSearching: true
            };
        case actionTypes.CREATE_ABILITY_BAR:
            return {
                ...state,
                isSearching: true,
                isCreating: true
            };
        case actionTypes.EDIT_ABILITY_BAR:
            return {
                ...state,
                isSearching: true,
                isSaving: true
            };
        case actionTypes.DELETE_ABILITY_BAR:
            return {
                ...state,
                isSearching: true,
                isSaving: true
            };
        // ITEMS
        case actionTypes.GET_ITEMS_SUCCESS:
            return {
                ...state,
                items: action.payload,
                error: "",
                isFetching: false
            };
        case actionTypes.GET_ITEM_SINGLE_SUCCESS:
            return {
                ...state,
                editItemObj: action.payload,
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
        // ABILITYS
        case actionTypes.GET_ABILITY_BAR_SINGLE_SUCCESS:
            return {
                ...state,
                editAbilityBarObj: action.payload,
                error: "",
                isFetching: false
            };
        case actionTypes.SEARCH_ABILITY_BARS_SUCCESS:
            return {
                ...state,
                searchAbilityBars: action.payload,
                error: "",
                isSearching: false
            };
        case actionTypes.CREATE_ABILITY_BAR_SUCCESS:
            return {
                ...state,
                searchAbilityBars: action.payload,
                error: "",
                isSearching: false,
                isCreating: false
            };
        case actionTypes.EDIT_ABILITY_BAR_SUCCESS:
            return {
                ...state,
                searchAbilityBars: action.payload,
                error: "",
                isSearching: false,
                isSaving: false
            };
        case actionTypes.DELETE_ABILITY_BAR_SUCCESS:
            return {
                ...state,
                searchAbilityBars: action.payload,
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