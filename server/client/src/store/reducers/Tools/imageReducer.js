/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../../actionTypes/Tools/imageActionTypes';

const intialState = {
    error: "",
    isUploading: false, // loading state
};

export default (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.UPLOAD:
            return {
                ...state,
                isUploading: true
            };
        case actionTypes.UPLOAD_SUCCESS:
            return {
                ...state,
                error: "",
                isUploading: false
            };
        case actionTypes.ERROR:
            return {
                ...state,
                error: action.payload,
                isUploading: false
            };
        default:
            return state;
    }
}