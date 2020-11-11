/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../../actionTypes/RSTools/activityActionTypes';

const intialState = {
    error: "",
    visWaxRunes: null,
    nemiForest: null,
    isFetchingVis: false, // loading state
    isFetchingNemi: false, // loading state
};

export default (state = intialState, action) => {
    switch (action.type) {
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
                isFetchingVis: false,
                isFetchingNemi: false
            };
        default:
            return state;
    }
}
