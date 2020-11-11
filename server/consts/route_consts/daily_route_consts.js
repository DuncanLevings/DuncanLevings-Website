/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

const _ROOT = '/daily';

const CHECK_RESET = '/check_reset';
const GET_DAILYS_REORDER = '/get_dailys/re_order/:type';
const GET_DAILYS = '/get_dailys/:type';
const GET_DAILY = '/get_daily/:id';
const SEARCH_DAILYS = '/search_dailys/:type/:filter';
const ADD = '/add';
const HIDE = '/hide_daily';
const CREATE = '/create';
const EDIT = '/edit';
const DELETE = '/delete/:id';
const REORDER = '/reorder';
const COMPLETE = '/complete_daily';

module.exports = {
    _ROOT,
    CHECK_RESET,
    GET_DAILYS,
    GET_DAILYS_REORDER,
    GET_DAILY,
    SEARCH_DAILYS,
    ADD,
    HIDE,
    CREATE,
    EDIT,
    DELETE,
    REORDER,
    COMPLETE
}