/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

const _config = require('../config/config.json');
const sgMail = require('@sendgrid/mail');
const { EMAIL_ERRORS } = require('../consts/error_jsons');

sgMail.setApiKey(_config.sendgrid_key);
const templateKey = "d-e4ef60e6bc7f439c8925059cb550bb87";

const sendMail = async (data) => {
    if (data.message.replace(/\s/g, "").length < 1) throw Error(EMAIL_ERRORS);

    const msg = {
        to: 'duncan.levings@gmail.com', // will come from database, hardcode for now
        from: 'duncan.levings@gmail.com', // temp until dns resolves domain
        templateId: templateKey,
        dynamic_template_data: {
            subject: data.subject,
            email: data.email,
            name: data.name || "Unknown",
            message: data.message
        }
    };

    await sgMail.send(msg)
        .catch(err => {
            return err;
        });
}

module.exports = {
    sendMail
}
