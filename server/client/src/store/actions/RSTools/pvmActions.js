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

export function getPvmTasksSlayerSuccess(tasks) {
    return { type: actionTypes.GET_PVM_TASKS_SLAYER_SUCCESS, payload: tasks };
}

export function getPvmTasksBossSuccess(tasks) {
    return { type: actionTypes.GET_PVM_TASKS_BOSS_SUCCESS, payload: tasks };
}

export function getPvmTasksRaidSuccess(tasks) {
    return { type: actionTypes.GET_PVM_TASKS_RAID_SUCCESS, payload: tasks };
}

export function getPvmSingle(pvmId) {
    return { type: actionTypes.GET_PVM_SINGLE, payload: pvmId };
}

export function getPvmSingleSuccess(pvm) {
    return { type: actionTypes.GET_PVM_SINGLE_SUCCESS, payload: pvm };
}

export function getPvmTaskSingle(pvmTaskId) {
    return { type: actionTypes.GET_PVM_TASK_SINGLE, payload: pvmTaskId };
}

export function getPvmTaskSingleSuccess(pvmTask) {
    return { type: actionTypes.GET_PVM_TASK_SINGLE_SUCCESS, payload: pvmTask };
}

// CREATE

export function checkPvmName(formData) {
    return { type: actionTypes.CHECK_PVM_NAME, payload: formData };
}

export function createPvm(formData, from = null) {
    return { type: actionTypes.CREATE_PVM, payload: formData, redirect: from };
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

export function editPvm(formData, from = null) {
    return { type: actionTypes.EDIT_PVM, payload: formData, redirect: from };
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

export function deletePvm(pvmId, filter) {
    return { type: actionTypes.DELETE_PVM, payload: { pvmId: pvmId, filter: filter } };
}

export function deletePvmSuccess(pvms) {
    return { type: actionTypes.DELETE_PVM_SUCCESS, payload: pvms };
}

export function deletePvmTask(pvmTaskId, type) {
    return { type: actionTypes.DELETE_PVM_TASK, payload: pvmTaskId, pvmType: type};
}

export function deletePvmSlayerTaskSuccess(pvmTasks) {
    return { type: actionTypes.DELETE_PVM_SLAYER_TASK_SUCCESS, payload: pvmTasks };
}

export function deletePvmBossTaskSuccess(pvmTasks) {
    return { type: actionTypes.DELETE_PVM_BOSS_TASK_SUCCESS, payload: pvmTasks };
}

export function deletePvmRaidTaskSuccess(pvmTasks) {
    return { type: actionTypes.DELETE_PVM_RAID_TASK_SUCCESS, payload: pvmTasks };
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
