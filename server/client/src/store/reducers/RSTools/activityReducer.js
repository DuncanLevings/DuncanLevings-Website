/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../../actionTypes/RSTools/activityActionTypes';

const intialState = {
    error: "",
    activities: [],
    activitySingle: null,
    visWaxRunes: null,
    nemiForest: null,
    isFetching: false, // loading state
    isFetchingSingle: false, // loading state
    isCreating: false, // loading state
    isSaving: false, // loading state
    isFetchingVis: false, // loading state
    isFetchingNemi: false, // loading state
};

export default (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ACTIVITIES:
            return {
                ...state,
                isFetching: true
            };
        case actionTypes.GET_ACTIVITY_SINGLE:
            return {
                ...state,
                isFetchingSingle: true
            };
        case actionTypes.CREATE_ACTIVITY:
            return {
                ...state,
                isCreating: true
            };
        case actionTypes.EDIT_ACTIVITY:
            return {
                ...state,
                isSaving: true
            };
        case actionTypes.DELETE_ACTIVITY:
            return {
                ...state,
                isSaving: true,
                isFetching: true
            };
        case actionTypes.VIS_WAX:
            return {
                ...state,
                isFetchingVis: true
            };
        case actionTypes.NEMI_FOREST:
            return {
                ...state,
                isFetchingNemi: true
            };
        case actionTypes.GET_ACTIVITIES_SUCCESS:
            return {
                ...state,
                activities: action.payload,
                error: "",
                isFetching: false
            };
        case actionTypes.GET_ACTIVITY_SINGLE_SUCCESS:
            return {
                ...state,
                activitySingle: action.payload,
                error: "",
                isFetchingSingle: false
            };
        case actionTypes.CREATE_ACTIVITY_SUCCESS:
            return {
                ...state,
                error: "",
                isCreating: false
            };
        case actionTypes.EDIT_ACTIVITY_SUCCESS:
            return {
                ...state,
                error: "",
                isSaving: false
            };
        case actionTypes.DELETE_ACTIVITY_SUCCESS:
            return {
                ...state,
                activities: action.payload,
                error: "",
                isSaving: false,
                isFetching: false
            };
        case actionTypes.VIS_WAX_SUCCESS:
            return {
                ...state,
                error: "",
                visWaxRunes: action.payload,
                isFetchingVis: false
            };
        case actionTypes.NEMI_FOREST_SUCCESS:
            return {
                ...state,
                error: "",
                nemiForest: action.payload,
                isFetchingNemi: false
            };
        case actionTypes.ERROR:
            return {
                ...state,
                error: action.payload,
                isCreating: false,
                isSaving: false,
                isFetching: false,
                isFetchingSingle: false,
                isFetchingVis: false,
                isFetchingNemi: false
            };
        default:
            return state;
    }
}
