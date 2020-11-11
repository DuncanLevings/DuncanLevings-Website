/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../../actionTypes/Tools/imageActionTypes';

// UPLOAD

export function upload(formData) {
    return { type: actionTypes.UPLOAD, payload: formData };
}

export function uploadSuccess() {
    return { type: actionTypes.UPLOAD_SUCCESS };
}

// ERROR

export function imageError(error) {
    return { type: actionTypes.ERROR, payload: error };
}
