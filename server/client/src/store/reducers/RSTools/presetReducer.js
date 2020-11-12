/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../../actionTypes/RSTools/presetActionTypes';

const intialState = {
    error: "",
    presets: [],
    editPresetObj: null,
    isFetching: false, // loading state
    isFetchingSingle: false, // loading state
    isCreating: false, // loading state
    isSaving: false, // loading state
};

export default (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PRESETS:
            return {
                ...state,
                isFetching: true
            };
        case actionTypes.GET_PRESET_SINGLE:
            return {
                ...state,
                isFetchingSingle: true
            };
        case actionTypes.CREATE_PRESET:
            return {
                ...state,
                isCreating: true
            };
        case actionTypes.EDIT_PRESET:
            return {
                ...state,
                isSaving: true
            };
        case actionTypes.DELETE_PRESET:
            return {
                ...state,
                isSaving: true,
                isFetching: true
            };
        case actionTypes.GET_PRESETS_SUCCESS:
            return {
                ...state,
                presets: action.payload,
                error: "",
                isFetching: false
            };
        case actionTypes.GET_PRESET_SINGLE_SUCCESS:
            return {
                ...state,
                editPresetObj: action.payload,
                error: "",
                isFetchingSingle: false
            };
        case actionTypes.CREATE_PRESET_SUCCESS:
            return {
                ...state,
                error: "",
                isCreating: false
            };
        case actionTypes.EDIT_PRESET_SUCCESS:
            return {
                ...state,
                error: "",
                isSaving: false
            };
        case actionTypes.DELETE_PRESET_SUCCESS:
            return {
                ...state,
                presets: action.payload,
                error: "",
                isSaving: false,
                isFetching: false
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
            };
        default:
            return state;
    }
}