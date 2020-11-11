/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import api from '../Instance';

export function sendMailAPI(mailData) {
    return api.request({
        method: 'post',
        url: '/api/email/send',
        data: mailData
    });
}