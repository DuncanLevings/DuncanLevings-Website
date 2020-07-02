/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../actionTypes/navbarActionTypes';

const intialState = {
    hash: "",
};

export default (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_ACTIVE_HASH:
            return {
                ...state,
                hash: action.payload
            };
        default:
            return state;
    }
}