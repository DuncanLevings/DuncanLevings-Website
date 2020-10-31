/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

const _ROOT = '/daily';

const GET_DAILYS = '/get_dailys/:type';
const GET_DAILY = '/get_daily/:id';
const SEARCH_DAILYS = '/search_dailys/:type/:filter';
const ADD = '/add';
const HIDE = '/hide_daily';
const CREATE = '/create';
const EDIT = '/edit';
const DELETE = '/delete/:id';
const REORDER = '/reorder';

module.exports = {
    _ROOT,
    GET_DAILYS,
    GET_DAILY,
    SEARCH_DAILYS,
    ADD,
    HIDE,
    CREATE,
    EDIT,
    DELETE,
    REORDER
}