/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

const _ROOT = '/presets';

const GET_PRESETS = '/all';
const GET_PRESET_SINGLE = '/single/:presetId';
const CREATE_PRESET = '/create';
const EDIT_PRESET = '/edit';
const DELETE_PRESET = '/delete/:presetId';

module.exports = {
    _ROOT,
    GET_PRESETS,
    GET_PRESET_SINGLE,
    CREATE_PRESET,
    EDIT_PRESET,
    DELETE_PRESET
}