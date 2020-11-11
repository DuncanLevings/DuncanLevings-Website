/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../../actionTypes/Tools/notificationActionTypes';

const intialState = {
    notification_list: []
};

export default (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_NOTIFICATION:
            return {
                ...state,
                notification_list: [...state.notification_list, action.payload]
            };
        default:
            return state;
    }
}