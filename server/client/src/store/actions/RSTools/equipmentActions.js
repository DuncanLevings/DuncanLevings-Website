/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../../actionTypes/RSTools/equipmentActionTypes';

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

export function getAbilityBarSingle(abilityBarId) {
    return { type: actionTypes.GET_ABILITY_BAR_SINGLE, payload: abilityBarId };
}

export function getAbilityBarSingleSuccess(abilityBar) {
    return { type: actionTypes.GET_ABILITY_BAR_SINGLE_SUCCESS, payload: abilityBar };
}

export function searchAbilityBars(style) {
    return { type: actionTypes.SEARCH_ABILITY_BARS, payload: style };
}

export function searchAbilityBarsSuccess(abilityBars) {
    return { type: actionTypes.SEARCH_ABILITY_BARS_SUCCESS, payload: abilityBars };
}

export function createAbilityBar(formData, style) {
    return { type: actionTypes.CREATE_ABILITY_BAR, payload: { formData: formData, style: style } };
}

export function createAbilityBarSuccess(abilityBars) {
    return { type: actionTypes.CREATE_ABILITY_BAR_SUCCESS, payload: abilityBars };
}

export function editAbilityBar(formData, style) {
    return { type: actionTypes.EDIT_ABILITY_BAR, payload: { formData: formData, style: style }  };
}

export function editAbilityBarSuccess(abilityBars) {
    return { type: actionTypes.EDIT_ABILITY_BAR_SUCCESS, payload: abilityBars };
}

export function deleteAbilityBar(abilityBarId, style) {
    return { type: actionTypes.DELETE_ABILITY_BAR, payload: { abilityBarId: abilityBarId, style: style } };
}

export function deleteAbilityBarSuccess(abilityBars) {
    return { type: actionTypes.DELETE_ABILITY_BAR_SUCCESS, payload: abilityBars };
}

export function clearAbilityBarObj() {
    return { type: actionTypes.CLEAR_ABILITY_BAR_OBJ };
}

// ERROR

export function clearErrors() {
    return { type: actionTypes.CLEAR_ERRORS };
}

export function equipmentError(error) {
    return { type: actionTypes.ERROR, payload: error };
}
