/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

const _ROOT = '/equipment';

const GET_ITEMS = '/items';
const SEARCH_ITEMS = '/search/items/:slots';
const CREATE_ITEM = '/create/item/:slots';
const EDIT_ITEM = '/edit/item/:slots';
const DELETE_ITEM = '/delete/item/:itemId/:slots';

module.exports = {
    _ROOT,
    GET_ITEMS,
    SEARCH_ITEMS,
    CREATE_ITEM,
    EDIT_ITEM,
    DELETE_ITEM
}