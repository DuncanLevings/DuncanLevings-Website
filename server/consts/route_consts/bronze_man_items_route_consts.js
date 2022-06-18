/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

const _ROOT = '/bronze_man';

const GET_ITEMS = '/items/:name';
const SET_ACQUIRED = '/acquired/:itemId'
const CREATE_ITEM = '/create';
const DELETE_ITEM = '/delete/:itemId';

module.exports = {
    _ROOT,
    GET_ITEMS,
    SET_ACQUIRED,
    CREATE_ITEM,
    DELETE_ITEM
}