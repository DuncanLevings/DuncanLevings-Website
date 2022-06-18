
const USER_CLIENT_ERRORS = require('./user_errors.json').client_errors;
const USER_SERVER_ERRORS = require('./user_errors.json').server_errors;
const EMAIL_ERRORS = require('./email_errors.json').EMPTY_MESSAGE;
const AUTH_ERROR = require('./auth_errors.json').UNAUTHORIZED;
const DAILY_ERRORS = require('./daily_errors.json').server_errors;
const ACTIVITY_ERRORS = require('./activity_errors.json').server_errors;
const EQUIPMENT_ERRORS = require('./equipment_errors.json').server_errors;
const PRESET_ERRORS = require('./preset_errors.json').server_errors;
const FARM_RUN_ERRORS = require('./farm_run_errors.json').server_errors;
const PVM_ERRORS = require('./pvm_errors.json').server_errors;
const BRONZE_MAN_ERRORS = require('./bronze_man_item_errors.json').server_errors;
const BUDGET_ERRORS = require('./budget_errors.json').server_errors;
const SALARY_ERRORS = require('./salary_errors.json').server_errors;
const TRANSACTION_ERRORS = require('./transaction_errors.json').server_errors;
const COMBINED_TRANSACTION_ERRORS = require('./combined_transaction_errors.json').server_errors;
const AUDIT_ERRORS = require('./audit_errors.json').server_errors;

module.exports = {
    AUTH_ERROR,
    USER_CLIENT_ERRORS,
    USER_SERVER_ERRORS,
    EMAIL_ERRORS,
    DAILY_ERRORS,
    ACTIVITY_ERRORS,
    EQUIPMENT_ERRORS,
    PRESET_ERRORS,
    FARM_RUN_ERRORS,
    PVM_ERRORS,
    BRONZE_MAN_ERRORS,
    BUDGET_ERRORS,
    SALARY_ERRORS,
    TRANSACTION_ERRORS,
    COMBINED_TRANSACTION_ERRORS,
    AUDIT_ERRORS
}