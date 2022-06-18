/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import { call, takeLatest, put } from 'redux-saga/effects';
import {
    getItemsAPI,
    setAcquiredAPI,
    createItemAPI,
    deleteItemAPI
} from '../../api/RSTools/bronzeManAPI';
import * as actionTypes from '../../actionTypes/RSTools/bronzeManActionTypes'
import * as actionCreators from '../../actions/RSTools/bronzeManActions';

// ITEMS

function* getItems(itemAction) {
    try {
        if (typeof itemAction.payload != "undefined") {
            const items = yield call(getItemsAPI, itemAction.payload.name);
            yield put(actionCreators.getItemsSuccess(items));
        }
    } catch (error) {
        yield put(actionCreators.itemError(error.response.data));
    }
}

function* setAcquired(itemAction) {
    try {
        if (typeof itemAction.payload != "undefined") {
            yield call(setAcquiredAPI, itemAction.payload.itemId);
            yield put(actionCreators.setAcquiredSuccess());
        }
    } catch (error) {
        yield put(actionCreators.itemError(error.response.data));
    }
}

function* createItem(itemAction) {
    try {
        const item = yield call(createItemAPI, itemAction.payload.formData);
        yield put(actionCreators.createItemSuccess(item));
    } catch (error) {
        yield put(actionCreators.itemError(error.response.data));
    }
}

function* deleteItem(itemAction) {
    try {
        yield call(deleteItemAPI, itemAction.payload.itemId);
        yield put(actionCreators.deleteItemSuccess());
    } catch (error) {
        yield put(actionCreators.itemError(error.response.data));
    }
}

export const bronzeManSagas = [
    takeLatest(actionTypes.GET_BRONZE_MAN_ITEMS, getItems),
    takeLatest(actionTypes.SET_ACQUIRED, setAcquired),
    takeLatest(actionTypes.CREATE_BRONZE_MAN_ITEM, createItem),
    takeLatest(actionTypes.DELETE_BRONZE_MAN_ITEM, deleteItem)
];