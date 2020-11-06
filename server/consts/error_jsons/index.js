
const USER_CLIENT_ERRORS = require('./user_errors.json').client_errors;
const USER_SERVER_ERRORS = require('./user_errors.json').server_errors;
const EMAIL_ERRORS = require('./email_errors.json').EMPTY_MESSAGE;
const AUTH_ERROR = require('./auth_errors.json').UNAUTHORIZED;
const DAILY_ERRORS = require('./daily_errors.json').server_errors;
const ACTIVITY_ERRORS = require('./activity_errors.json').server_errors;
const EQUIPMENT_ERRORS = require('./equipment_errors.json').server_errors;

module.exports = {
    USER_CLIENT_ERRORS,
    USER_SERVER_ERRORS,
    EMAIL_ERRORS,
    DAILY_ERRORS,
    ACTIVITY_ERRORS,
    EQUIPMENT_ERRORS,
    AUTH_ERROR,
}