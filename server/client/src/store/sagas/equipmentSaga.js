/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import { call, takeLatest, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { createItemAPI, createAbilityBarAPI, deleteItemAPI, editItemAPI, getItemsAPI, getItemSingleAPI, searchItemsAPI, searchAbilityBarsAPI } from '../api/equipmentAPI';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import * as actionTypes from '../actionTypes/equipmentActionTypes'
import * as actionCreators from '../actions/equipmentActions';

// ITEMS

function* getItems(equipmentAction) {
    try {
        const items = yield call(getItemsAPI, equipmentAction.payload);
        yield put(actionCreators.getItemsSuccess(items));
    } catch (error) {
        yield put(actionCreators.equipmentError(error.response.data));
    }
}

function* getItemSingle(equipmentAction) {
    try {
        const item = yield call(getItemSingleAPI, equipmentAction.payload);
        yield put(actionCreators.getItemSingleSuccess(item));
    } catch (error) {
        yield put(actionCreators.equipmentError(error.response.data));
    }
}

function* searchItems(equipmentAction) {
    try {
        const items = yield call(searchItemsAPI, equipmentAction.payload);
        yield put(actionCreators.searchItemsSuccess(items));
    } catch (error) {
        yield put(actionCreators.equipmentError(error.response.data));
    }
}

function* createItem(equipmentAction) {
    try {
        const items = yield call(createItemAPI, equipmentAction.payload.formData, equipmentAction.payload.slots);
        yield put(actionCreators.createItemSuccess(items));
    } catch (error) {
        if (error.response.status === 500) {
            yield put(actionCreators.equipmentError("Image upload failed!"));
        } else if (error.response.status !== 401) {
            yield put(actionCreators.equipmentError(error.response.data));
        }
    }
}

function* editItem(equipmentAction) {
    try {
        const items = yield call(editItemAPI, equipmentAction.payload.formData, equipmentAction.payload.slots);
        yield put(actionCreators.editItemSuccess(items));
    } catch (error) {
        if (error.response.status === 500) {
            yield put(actionCreators.equipmentError("Image upload failed!"));
        } else if (error.response.status !== 401) {
            yield put(actionCreators.equipmentError(error.response.data));
        }
    }
}

function* deleteItem(equipmentAction) {
    try {
        const items = yield call(deleteItemAPI, equipmentAction.payload.itemId, equipmentAction.payload.slots);
        yield put(actionCreators.deleteItemSuccess(items));
    } catch (error) {
        yield put(actionCreators.equipmentError(error.response.data));
    }
}

// ABILTIYS

function* searchAbilityBars(equipmentAction) {
    try {
        const abilityBars = yield call(searchAbilityBarsAPI, equipmentAction.payload);
        yield put(actionCreators.searchAbilityBarsSuccess(abilityBars));
    } catch (error) {
        yield put(actionCreators.equipmentError(error.response.data));
    }
}

function* createAbilityBar(equipmentAction) {
    try {
        const abilityBars = yield call(createAbilityBarAPI, equipmentAction.payload.formData, equipmentAction.payload.style);
        yield put(actionCreators.createAbilityBarSuccess(abilityBars));
    } catch (error) {
        yield put(actionCreators.equipmentError(error.response.data));
    }
}

export const equipmentSagas = [
    takeLatest(actionTypes.GET_ITEMS, getItems),
    takeLatest(actionTypes.GET_ITEM_SINGLE, getItemSingle),
    takeLatest(actionTypes.SEARCH_ITEMS, searchItems),
    takeLatest(actionTypes.CREATE_ITEM, createItem),
    takeLatest(actionTypes.EDIT_ITEM, editItem),
    takeLatest(actionTypes.DELETE_ITEM, deleteItem),
    takeLatest(actionTypes.SEARCH_ABILITY_BARS, searchAbilityBars),
    takeLatest(actionTypes.CREATE_ABILITY_BAR, createAbilityBar)
];