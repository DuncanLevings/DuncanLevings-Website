/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../actionTypes/navbarActionTypes';

export function updateActiveHash(hash) {
    return { type: actionTypes.UPDATE_ACTIVE_HASH, payload: hash };
}