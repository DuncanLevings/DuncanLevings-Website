/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import { call, takeLatest, put } from 'redux-saga/effects';
import { sendMailAPI } from '../../api/Resume/emailAPI';
import * as actionTypes from '../../actionTypes/Resume/emailActionTypes'
import * as actionCreators from '../../actions/Resume/emailActions';

function* sendMail(mailAction) {
    try {
        yield call(sendMailAPI, mailAction.payload);
        yield put(actionCreators.sendMailSuccess());
    } catch (error) {
        yield put(actionCreators.mailError(error.response.data));
    }
}

export const emailSagas = [
    takeLatest(actionTypes.SEND_MAIL, sendMail)
];