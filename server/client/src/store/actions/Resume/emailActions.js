/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../../actionTypes/Resume/emailActionTypes';

// SEND MAIL

export function sendMail(mailData) {
    return { type: actionTypes.SEND_MAIL, payload: mailData };
}

export function sendMailSuccess(user) {
    return { type: actionTypes.SEND_MAIL_SUCCESS };
}

// ERROR

export function mailError(error) {
    return { type: actionTypes.ERROR, payload: error };
}
