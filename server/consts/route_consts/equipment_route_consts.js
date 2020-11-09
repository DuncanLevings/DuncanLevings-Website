/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

const _ROOT = '/equipment';

const GET_ITEMS = '/items';
const GET_ITEM_SINGLE = '/item/:itemId';
const GET_ABILITY_BAR_SINGLE = '/abilityBar/:abilityBarId';
const SEARCH_ITEMS = '/search/items/:slots';
const SEARCH_ABILITY_BARS = '/search/abilityBar/:style';
const CREATE_ITEM = '/create/item/:slots';
const CREATE_ABILITY_BAR = '/create/abilityBar/:style';
const EDIT_ITEM = '/edit/item/:slots';
const EDIT_ABILITY_BAR = '/edit/abilityBar/:style';
const DELETE_ITEM = '/delete/item/:itemId/:slots';
const DELETE_ABILITY_BAR = '/delete/abilityBar/:abilityBarId/:style';

module.exports = {
    _ROOT,
    GET_ITEMS,
    GET_ITEM_SINGLE,
    GET_ABILITY_BAR_SINGLE,
    SEARCH_ITEMS,
    SEARCH_ABILITY_BARS,
    CREATE_ABILITY_BAR,
    CREATE_ITEM,
    EDIT_ITEM,
    EDIT_ABILITY_BAR,
    DELETE_ITEM,
    DELETE_ABILITY_BAR
}