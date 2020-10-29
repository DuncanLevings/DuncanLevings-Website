
const USER_CLIENT_ERRORS = require('./user_errors.json').client_errors;
const USER_SERVER_ERRORS = require('./user_errors.json').server_errors;
const EMAIL_ERRORS = require('./email_errors.json').EMPTY_MESSAGE;
const AUTH_ERROR = require('./auth_errors.json').UNAUTHORIZED;
const DAILY_ERRORS = require('./daily_errors.json').server_errors;

module.exports = {
    USER_CLIENT_ERRORS,
    USER_SERVER_ERRORS,
    EMAIL_ERRORS,
    DAILY_ERRORS,
    AUTH_ERROR
}