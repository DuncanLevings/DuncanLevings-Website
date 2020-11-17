/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../../actionTypes/RSTools/farmRunActionTypes';

const intialState = {
    error: "",
    farmRun: null,
    isFetching: false, // loading state
    isCreating: false, // loading state
    isSaving: false, // loading state
};

export default (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.GET_FARM_RUN:
            return {
                ...state,
                isFetching: true
            };
        case actionTypes.CREATE_FARM_RUN:
            return {
                ...state,
                isCreating: true
            };
        case actionTypes.EDIT_FARM_RUN:
            return {
                ...state,
                isSaving: true
            };
        case actionTypes.GET_FARM_RUN_SUCCESS:
            return {
                ...state,
                farmRun: action.payload,
                error: "",
                isFetching: false
            };
        case actionTypes.CREATE_FARM_RUN_SUCCESS:
            return {
                ...state,
                error: "",
                isCreating: false
            };
        case actionTypes.EDIT_FARM_RUN_SUCCESS:
            return {
                ...state,
                error: "",
                isSaving: false
            };
        case actionTypes.CLEAR_ERROR:
            return {
                ...state,
                error: "",
            };
        case actionTypes.ERROR:
            return {
                ...state,
                error: action.payload,
                isCreating: false,
                isSaving: false,
                isFetching: false
            };
        default:
            return state;
    }
}