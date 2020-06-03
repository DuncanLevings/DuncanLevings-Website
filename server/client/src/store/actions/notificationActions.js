/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../actionTypes/notificationActionTypes';

export function successNotification(description) {
    return { type: actionTypes.ADD_NOTIFICATION, payload: {
            title: "Success",
            description: description,
            headerColor: "#4e9c4e",
            backgroundColor: "#5cb85c",
            icon: "icons/check.svg"
        } 
    };
}
