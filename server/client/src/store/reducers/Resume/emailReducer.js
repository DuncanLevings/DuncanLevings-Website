/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../../actionTypes/Resume/emailActionTypes';

const intialState = {
    error: "",
    isSending: false, // loading state
};

export default (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.SEND_MAIL:
            return {
                ...state,
                isSending: true
            };
        case actionTypes.SEND_MAIL_SUCCESS:
            return {
                ...state,
                error: "",
                isSending: false
            };
        case actionTypes.ERROR:
            return {
                ...state,
                error: action.payload,
                isSending: false
            };
        default:
            return state;
    }
}
