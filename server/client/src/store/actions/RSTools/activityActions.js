/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../../actionTypes/RSTools/activityActionTypes';

// ACTIVITIES

export function getActivities() {
    return { type: actionTypes.GET_ACTIVITIES };
}

export function getActivitiesSuccess(activities) {
    return { type: actionTypes.GET_ACTIVITIES_SUCCESS, payload: activities };
}

export function getActivitySingle(activityId) {
    return { type: actionTypes.GET_ACTIVITY_SINGLE, payload: activityId };
}

export function getActivitySingleSuccess(activity) {
    return { type: actionTypes.GET_ACTIVITY_SINGLE_SUCCESS, payload: activity };
}

export function createActivity(data) {
    return { type: actionTypes.CREATE_ACTIVITY, payload: data };
}

export function createActivitySuccess() {
    return { type: actionTypes.CREATE_ACTIVITY_SUCCESS };
}

export function editActivity(data) {
    return { type: actionTypes.EDIT_ACTIVITY, payload: data };
}

export function editActivitySuccess() {
    return { type: actionTypes.EDIT_ACTIVITY_SUCCESS };
}

export function deleteActivity(activityId) {
    return { type: actionTypes.DELETE_ACTIVITY, payload: activityId };
}

export function deleteActivitySuccess(activities) {
    return { type: actionTypes.DELETE_ACTIVITY_SUCCESS, payload: activities };
}

// GET VIX WAX

export function getVixWax() {
    return { type: actionTypes.VIS_WAX };
}

export function getVixWaxSuccess(data) {
    return { type: actionTypes.VIS_WAX_SUCCESS, payload: data };
}

// GET NEMI FOREST

export function getLastestNemi() {
    return { type: actionTypes.NEMI_FOREST };
}

export function getLastestNemiSuccess(data) {
    return { type: actionTypes.NEMI_FOREST_SUCCESS, payload: data };
}

// ERROR

export function activityError(error) {
    return { type: actionTypes.ERROR, payload: error };
}
