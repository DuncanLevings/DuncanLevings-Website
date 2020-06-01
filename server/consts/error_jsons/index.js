
const USER_CLIENT_ERRORS = require('./user_errors.json').client_errors;
const USER_SERVER_ERRORS = require('./user_errors.json').server_errors;
const AUTH_ERROR = require('./auth_errors.json').UNAUTHORIZED;

module.exports = {
    USER_CLIENT_ERRORS,
    USER_SERVER_ERRORS,
    AUTH_ERROR
}