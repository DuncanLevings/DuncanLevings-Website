/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../../actionTypes/RSTools/bronzeManActionTypes';

// IEMS

export function getItems(name) {
    return { type: actionTypes.GET_BRONZE_MAN_ITEMS, payload: { name: name} };
}

export function getItemsSuccess(items) {
    return { type: actionTypes.GET_BRONZE_MAN_ITEMS_SUCCESS, payload: items };
}

export function setAcquired(itemId) {
    return { type: actionTypes.SET_ACQUIRED, payload: { itemId: itemId } };
}

export function setAcquiredSuccess() {
    return { type: actionTypes.SET_ACQUIRED };
}

export function createItem(formData) {
    return { type: actionTypes.CREATE_BRONZE_MAN_ITEM, payload: { formData: formData } };
}

export function createItemSuccess(item) {
    return { type: actionTypes.CREATE_BRONZE_MAN_ITEM_SUCCESS, payload: item };
}

export function deleteItem(itemId) {
    return { type: actionTypes.DELETE_BRONZE_MAN_ITEM, payload: { itemId: itemId } };
}

export function deleteItemSuccess() {
    return { type: actionTypes.DELETE_BRONZE_MAN_ITEM_SUCCESS };
}

// ERROR

export function clearErrors() {
    return { type: actionTypes.CLEAR_ERRORS };
}

export function itemError(error) {
    return { type: actionTypes.ERROR, payload: error };
}
