/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../../actionTypes/RSTools/pvmActionTypes';

// SEARCH

export function searchPvm(type, filter) {
    return { type: actionTypes.SEARCH_PVM, payload: { type: type, filter: filter} };
}

export function searchPvmSuccess(pvms) {
    return { type: actionTypes.SEARCH_PVM_SUCCESS, payload: pvms };
}

// RETRIEVE

export function getPvmTasks(type) {
    return { type: actionTypes.GET_PVM_TASKS, payload: type };
}

export function getPvmTasksSuccess(tasks) {
    return { type: actionTypes.GET_PVM_TASKS_SUCCESS, payload: tasks };
}

export function getPvmSingle(type, pvmId) {
    return { type: actionTypes.GET_PVM_SINGLE, payload: { type: type, pvmId: pvmId } };
}

export function getPvmSingleSuccess(pvm) {
    return { type: actionTypes.GET_PVM_SINGLE_SUCCESS, payload: pvm };
}

export function getPvmTaskSingle(type, pvmTaskId) {
    return { type: actionTypes.GET_PVM_TASK_SINGLE, payload: { type: type, pvmTaskId: pvmTaskId } };
}

export function getPvmTaskSingleSuccess(pvmTask) {
    return { type: actionTypes.GET_PVM_TASK_SINGLE_SUCCESS, payload: pvmTask };
}

// CREATE

export function createPvm(formData) {
    return { type: actionTypes.CREATE_PVM, payload: formData };
}

export function createPvmSuccess() {
    return { type: actionTypes.CREATE_PVM_SUCCESS };
}

export function createPvmTask(formData) {
    return { type: actionTypes.CREATE_PVM_TASK, payload: formData };
}

export function createPvmTaskSuccess() {
    return { type: actionTypes.CREATE_PVM_TASK_SUCCESS };
}

// EDIT

export function editPvm(formData) {
    return { type: actionTypes.EDIT_PVM, payload: formData };
}

export function editPvmSuccess() {
    return { type: actionTypes.EDIT_PVM_SUCCESS };
}

export function editPvmTask(formData) {
    return { type: actionTypes.EDIT_PVM_TASK, payload: formData };
}

export function editPvmTaskSuccess() {
    return { type: actionTypes.EDIT_PVM_TASK_SUCCESS };
}

// DELETE

export function deletePvm(pvmId) {
    return { type: actionTypes.DELETE_PVM, payload: pvmId };
}

export function deletePvmSuccess(pvms) {
    return { type: actionTypes.DELETE_PVM_SUCCESS, payload: pvms };
}

export function deletePvmTask(pvmTaskId) {
    return { type: actionTypes.DELETE_PVM_TASK, payload: pvmTaskId };
}

export function deletePvmTaskSuccess(pvmTasks) {
    return { type: actionTypes.DELETE_PVM_TASK_SUCCESS, payload: pvmTasks };
}

// type

export function setPvmType(type) {
    let name = "Slayer";
    switch (type) {
        case 1:
            name = "Boss";
            break;
        case 2:
            name = "Raid";
            break;
        default:
            break;
    }
    return { type: actionTypes.SET_PVM_TYPE, payload: { type: type, name: name } };
}

// ERROR

export function pvmError(error) {
    return { type: actionTypes.ERROR, payload: error };
}
