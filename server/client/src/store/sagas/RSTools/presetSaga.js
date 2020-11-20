/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import { call, takeLatest, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
    createPresetAPI,
    deletePresetAPI,
    editPresetAPI,
    getPresetingleAPI,
    getPresetsAPI
} from '../../api/RSTools/presetAPI';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import * as actionTypes from '../../actionTypes/RSTools/presetActionTypes'
import * as actionCreators from '../../actions/RSTools/presetActions';

function* getPresets() {
    try {
        const presets = yield call(getPresetsAPI);
        yield put(actionCreators.getPresetsSuccess(presets));
    } catch (error) {
        yield put(actionCreators.presetError(error.response.data));
    }
}

function* getPresetSingle(presetAction) {
    try {
        const preset = yield call(getPresetingleAPI, presetAction.payload);
        yield put(actionCreators.getPresetSingleSuccess(preset));
    } catch (error) {
        yield put(actionCreators.presetError(error.response.data));
    }
}

function* createPreset(presetAction) {
    try {
        yield call(createPresetAPI, presetAction.payload);
        yield put(actionCreators.createPresetSuccess());
        if (presetAction.redirect) yield put(push(presetAction.redirect, presetAction.routeState));
        else yield put(push(RSTOOL_ROUTES.EQUIPMENT));
    } catch (error) {
        yield put(actionCreators.presetError(error.response.data));
    }
}

function* editPreset(presetAction) {
    try {
        yield call(editPresetAPI, presetAction.payload);
        yield put(actionCreators.editPresetSuccess());
        if (presetAction.redirect) yield put(push(presetAction.redirect, presetAction.routeState));
        else yield put(push(RSTOOL_ROUTES.EQUIPMENT));
    } catch (error) {
        yield put(actionCreators.presetError(error.response.data));
    }
}

function* deletePreset(presetAction) {
    try {
        const presets = yield call(deletePresetAPI, presetAction.payload);
        yield put(actionCreators.deletePresetSuccess(presets));
    } catch (error) {
        yield put(actionCreators.presetError(error.response.data));
    }
}

function* savePreset(presetAction) {
    yield put(push(presetAction.redirect, presetAction.routeState));
}

export const presetSagas = [
    takeLatest(actionTypes.GET_PRESETS, getPresets),
    takeLatest(actionTypes.GET_PRESET_SINGLE, getPresetSingle),
    takeLatest(actionTypes.CREATE_PRESET, createPreset),
    takeLatest(actionTypes.EDIT_PRESET, editPreset),
    takeLatest(actionTypes.DELETE_PRESET, deletePreset),
    takeLatest(actionTypes.SAVE_PRESET, savePreset),
];