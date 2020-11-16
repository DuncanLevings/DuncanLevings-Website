/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../../actionTypes/RSTools/presetActionTypes';

// PRESETS

export function getPresets() {
    return { type: actionTypes.GET_PRESETS };
}

export function getPresetsSuccess(presets) {
    return { type: actionTypes.GET_PRESETS_SUCCESS, payload: presets };
}

export function getPresetSingle(presetId) {
    return { type: actionTypes.GET_PRESET_SINGLE, payload: presetId };
}

export function getPresetSingleSuccess(preset) {
    return { type: actionTypes.GET_PRESET_SINGLE_SUCCESS, payload: preset };
}

export function createPreset(data, from = null) {
    return { type: actionTypes.CREATE_PRESET, payload: data, redirect: from };
}

export function createPresetSuccess() {
    return { type: actionTypes.CREATE_PRESET_SUCCESS };
}

export function editPreset(data, from = null) {
    return { type: actionTypes.EDIT_PRESET, payload: data, redirect: from };
}

export function editPresetSuccess() {
    return { type: actionTypes.EDIT_PRESET_SUCCESS };
}

export function deletePreset(presetId) {
    return { type: actionTypes.DELETE_PRESET, payload: presetId };
}

export function deletePresetSuccess(presets) {
    return { type: actionTypes.DELETE_PRESET_SUCCESS, payload: presets };
}

export function savePreset(preset, from) {
    return { type: actionTypes.SAVE_PRESET, payload: preset, redirect: from };
}

export function clearPreset() {
    return { type: actionTypes.CLEAR_PRESET };
}

// ERROR

export function clearErrors() {
    return { type: actionTypes.CLEAR_ERRORS };
}

export function presetError(error) {
    return { type: actionTypes.ERROR, payload: error };
}
