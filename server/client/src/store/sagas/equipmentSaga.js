/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import { call, takeLatest, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { createItemAPI, deleteItemAPI, editItemAPI, getItemsAPI, searchItemsAPI } from '../api/equipmentAPI';
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
        const items = yield call(editItemAPI, equipmentAction.payload);
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

export const equipmentSagas = [
    takeLatest(actionTypes.GET_ITEMS, getItems),
    takeLatest(actionTypes.SEARCH_ITEMS, searchItems),
    takeLatest(actionTypes.CREATE_ITEM, createItem),
    takeLatest(actionTypes.EDIT_ITEM, editItem),
    takeLatest(actionTypes.DELETE_ITEM, deleteItem)
];