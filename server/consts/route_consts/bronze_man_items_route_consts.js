/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

const _ROOT = '/bronze_man';

const GET_ITEMS = '/items/:name';
const SET_ACQUIRED = '/acquired/:itemId'
const CREATE_ITEM = '/create';
const GET_ENEMY = '/enemy/:name';
const GET_ENEMY_DATA = '/enemy/data/:name'
const CREATE_ENEMY = '/create/enemy';
const DELETE_ITEM = '/delete/:itemId';
const DELETE_ENEMY = '/delete/enemy/:enemyId';

module.exports = {
    _ROOT,
    GET_ITEMS,
    SET_ACQUIRED,
    CREATE_ITEM,
    GET_ENEMY,
    GET_ENEMY_DATA,
    CREATE_ENEMY,
    DELETE_ITEM,
    DELETE_ENEMY
}