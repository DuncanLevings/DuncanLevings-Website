/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as actionTypes from '../../actionTypes/RSTools/pvmActionTypes';

const intialState = {
    error: "",
    pvmType: 0,
    pvmTypeName: "Slayer",
    searchPvm: [],
    pvmTasksSlayer: [],
    pvmTasksBoss: [],
    pvmTasksRaid: [],
    pvmSingle: null,
    pvmTaskSingle: null,
    isSaving: false, // loading state
    isFetching: false, // loading state
    isSearching: false, // loading state
    isCreating: false, // loading state
};

export default (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_PVM:
            return {
                ...state,
                isSearching: true
            };
        case actionTypes.GET_PVM_TASKS:
            return {
                ...state,
                isFetching: true
            };
        case actionTypes.GET_PVM_SINGLE:
            return {
                ...state,
                isFetching: true
            };
        case actionTypes.GET_PVM_TASK_SINGLE:
            return {
                ...state,
                isFetching: true
            };
        case actionTypes.CHECK_PVM_NAME:
            return {
                ...state,
                isCreating: true
            };
        case actionTypes.CREATE_PVM:
            return {
                ...state,
                isCreating: true
            };
        case actionTypes.CREATE_PVM_TASK:
            return {
                ...state,
                isCreating: true
            };
        case actionTypes.EDIT_PVM:
            return {
                ...state,
                isSaving: true
            };
        case actionTypes.EDIT_PVM_TASK:
            return {
                ...state,
                isSaving: true
            };
        case actionTypes.DELETE_PVM:
            return {
                ...state,
                isSaving: true
            };
        case actionTypes.DELETE_PVM_TASK:
            return {
                ...state,
                isSaving: true
            };
        case actionTypes.SET_PVM_TYPE:
            return {
                ...state,
                pvmType: action.payload.type,
                pvmTypeName: action.payload.name
            };
        case actionTypes.SEARCH_PVM_SUCCESS:
            return {
                ...state,
                searchPvm: action.payload,
                error: "",
                isSearching: false
            };
        case actionTypes.GET_PVM_TASKS_SLAYER_SUCCESS:
            return {
                ...state,
                pvmTasksSlayer: action.payload,
                error: "",
                isFetching: false
            };
        case actionTypes.GET_PVM_TASKS_BOSS_SUCCESS:
            return {
                ...state,
                pvmTasksBoss: action.payload,
                error: "",
                isFetching: false
            };
        case actionTypes.GET_PVM_TASKS_RAID_SUCCESS:
            return {
                ...state,
                pvmTasksRaid: action.payload,
                error: "",
                isFetching: false
            };
        case actionTypes.GET_PVM_SINGLE_SUCCESS:
            return {
                ...state,
                pvmSingle: action.payload,
                error: "",
                isFetching: false
            };
        case actionTypes.GET_PVM_TASK_SINGLE_SUCCESS:
            return {
                ...state,
                pvmTaskSingle: action.payload,
                error: "",
                isFetching: false
            };
        case actionTypes.CREATE_PVM_SUCCESS:
            return {
                ...state,
                error: "",
                isCreating: false
            };
        case actionTypes.CREATE_PVM_TASK_SUCCESS:
            return {
                ...state,
                error: "",
                isCreating: false
            };
        case actionTypes.EDIT_PVM_SUCCESS:
            return {
                ...state,
                error: "",
                isSaving: false
            };
        case actionTypes.EDIT_PVM_TASK_SUCCESS:
            return {
                ...state,
                error: "",
                isSaving: false
            };
        case actionTypes.DELETE_PVM_SUCCESS:
            return {
                ...state,
                searchPvm: action.payload,
                error: "",
                isSaving: false
            };
        case actionTypes.DELETE_PVM_SLAYER_TASK_SUCCESS:
            return {
                ...state,
                pvmTasksSlayer: action.payload,
                error: "",
                isSaving: false
            };
        case actionTypes.DELETE_PVM_BOSS_TASK_SUCCESS:
            return {
                ...state,
                pvmTasksBoss: action.payload,
                error: "",
                isSaving: false
            };
        case actionTypes.DELETE_PVM_RAID_TASK_SUCCESS:
            return {
                ...state,
                pvmTasksRaid: action.payload,
                error: "",
                isSaving: false
            };
        case actionTypes.ERROR:
            return {
                ...state,
                error: action.payload,
                isCreating: false,
                isSaving: false,
                isFetching: false,
                isSearching: false,
            };
        default:
            return state;
    }
}