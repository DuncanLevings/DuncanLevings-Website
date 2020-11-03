/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../actionTypes/activityActionTypes';

const intialState = {
    error: "",
    nemiForest: null,
    isFetching: false, // loading state
};

export default (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.NEMI_FOREST:
            return {
                ...state,
                isFetching: true
            };
        case actionTypes.NEMI_FOREST_SUCCESS:
            return {
                ...state,
                error: "",
                nemiForest: action.payload,
                isFetching: false
            };
        case actionTypes.ERROR:
            return {
                ...state,
                error: action.payload,
                isFetching: false
            };
        default:
            return state;
    }
}
