/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../actionTypes/equipmentActionTypes';

// PRESETS


// IEMS

export function getItems() {
    return { type: actionTypes.GET_ITEMS };
}

export function getItemsSuccess(items) {
    return { type: actionTypes.GET_ITEMS_SUCCESS, payload: items };
}

export function getItemSingle(itemId) {
    return { type: actionTypes.GET_ITEM_SINGLE, payload: itemId };
}

export function getItemSingleSuccess(item) {
    return { type: actionTypes.GET_ITEM_SINGLE_SUCCESS, payload: item };
}

export function searchItems(slots) {
    return { type: actionTypes.SEARCH_ITEMS, payload: slots };
}

export function searchItemsSuccess(items) {
    return { type: actionTypes.SEARCH_ITEMS_SUCCESS, payload: items };
}

export function createItem(formData, slots) {
    return { type: actionTypes.CREATE_ITEM, payload: { formData: formData, slots: slots } };
}

export function createItemSuccess(items) {
    return { type: actionTypes.CREATE_ITEM_SUCCESS, payload: items };
}

export function editItem(formData, slots) {
    return { type: actionTypes.EDIT_ITEM, payload: { formData: formData, slots: slots }  };
}

export function editItemSuccess(items) {
    return { type: actionTypes.EDIT_ITEM_SUCCESS, payload: items };
}

export function deleteItem(itemId, slots) {
    return { type: actionTypes.DELETE_ITEM, payload: { itemId: itemId, slots: slots } };
}

export function deleteItemSuccess(items) {
    return { type: actionTypes.DELETE_ITEM_SUCCESS, payload: items };
}

// ABILITYS

// ERROR

export function clearErrors() {
    return { type: actionTypes.CLEAR_ERRORS };
}

export function equipmentError(error) {
    return { type: actionTypes.ERROR, payload: error };
}
