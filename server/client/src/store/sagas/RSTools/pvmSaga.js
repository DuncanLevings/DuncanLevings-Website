/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import { call, takeLatest, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
    checkPvmNameAPI,
    createPvmAPI,
    createPvmTaskAPI,
    deletePvmAPI,
    deletePvmTaskAPI,
    editPvmAPI,
    editPvmTaskAPI,
    getPvmSingleAPI,
    getPvmTasksAPI,
    getPvmTaskSingleAPI,
    searchPvmAPI
} from '../../api/RSTools/pvmAPI';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import * as actionTypes from '../../actionTypes/RSTools/pvmActionTypes'
import * as actionCreators from '../../actions/RSTools/pvmActions';

function* searchPvm(pvmAction) {
    try {
        const pvms = yield call(searchPvmAPI, pvmAction.payload.type, pvmAction.payload.filter);
        yield put(actionCreators.searchPvmSuccess(pvms));
    } catch (error) {
        yield put(actionCreators.pvmError(error.response.data));
    }
}

function* getPvmTasks(pvmAction) {
    try {
        const pvmTasks = yield call(getPvmTasksAPI, pvmAction.payload);
        switch (pvmAction.payload) {
            case 0:
                yield put(actionCreators.getPvmTasksSlayerSuccess(pvmTasks));
                break;
            case 1:
                yield put(actionCreators.getPvmTasksBossSuccess(pvmTasks));
                break;
            case 2:
                yield put(actionCreators.getPvmTasksRaidSuccess(pvmTasks));
                break;
            default:
                break;
        }
    } catch (error) {
        yield put(actionCreators.pvmError(error.response.data));
    }
}

function* getPvmSingle(pvmAction) {
    try {
        const pvm = yield call(getPvmSingleAPI, pvmAction.payload);
        yield put(actionCreators.getPvmSingleSuccess(pvm));
    } catch (error) {
        yield put(actionCreators.pvmError(error.response.data));
    }
}

function* getPvmTaskSingle(pvmAction) {
    try {
        const pvmTask = yield call(getPvmTaskSingleAPI, pvmAction.payload);
        yield put(actionCreators.getPvmTaskSingleSuccess(pvmTask));
    } catch (error) {
        yield put(actionCreators.pvmError(error.response.data));
    }
}

function* createPvm(pvmAction) {
    try {
        yield call(checkPvmNameAPI, pvmAction.payload);
        yield call(createPvmAPI, pvmAction.payload);
        yield put(actionCreators.createPvmSuccess());
        if (pvmAction.redirect) yield put(push(pvmAction.redirect));
        else yield put(push(RSTOOL_ROUTES.PVM));
    } catch (error) {
        if (error.response.status === 500) {
            yield put(actionCreators.pvmError("Image upload failed!"));
        } else if (error.response.status !== 401) {
            yield put(actionCreators.pvmError(error.response.data));
        }
    }
}

function* createPvmTask(pvmAction) {
    try {
        yield call(createPvmTaskAPI, pvmAction.payload);
        yield put(actionCreators.createPvmTaskSuccess());
        yield put(push(RSTOOL_ROUTES.PVM));
    } catch (error) {
        if (error.response.status === 500) {
            yield put(actionCreators.pvmError("Image upload failed!"));
        } else if (error.response.status !== 401) {
            yield put(actionCreators.pvmError(error.response.data));
        }
    }
}

function* editPvm(pvmAction) {
    try {
        yield call(checkPvmNameAPI, pvmAction.payload);
        yield call(editPvmAPI, pvmAction.payload);
        yield put(actionCreators.editPvmSuccess());
        if (pvmAction.redirect) yield put(push(pvmAction.redirect));
        else yield put(push(RSTOOL_ROUTES.PVM));
    } catch (error) {
        if (error.response.status === 500) {
            yield put(actionCreators.pvmError("Image upload failed!"));
        } else if (error.response.status !== 401) {
            yield put(actionCreators.pvmError(error.response.data));
        }
    }
}

function* editPvmTask(pvmAction) {
    try {
        yield call(editPvmTaskAPI, pvmAction.payload);
        yield put(actionCreators.editPvmTaskSuccess());
        yield put(push(RSTOOL_ROUTES.PVM));
    } catch (error) {
        if (error.response.status === 500) {
            yield put(actionCreators.pvmError("Image upload failed!"));
        } else if (error.response.status !== 401) {
            yield put(actionCreators.pvmError(error.response.data));
        }
    }
}

function* deletePvm(pvmAction) {
    try {
        const pvms = yield call(deletePvmAPI, pvmAction.payload.pvmId, pvmAction.payload.filter);
        yield put(actionCreators.deletePvmSuccess(pvms));
    } catch (error) {
        yield put(actionCreators.pvmError(error.response.data));
    }
}

function* deletePvmTask(pvmAction) {
    try {
        const pvmTasks = yield call(deletePvmTaskAPI, pvmAction.payload);
        switch (pvmAction.pvmType) {
            case 0:
                yield put(actionCreators.deletePvmSlayerTaskSuccess(pvmTasks));
                break;
            case 1:
                yield put(actionCreators.deletePvmBossTaskSuccess(pvmTasks));
                break;
            case 2:
                yield put(actionCreators.deletePvmRaidTaskSuccess(pvmTasks));
                break;
            default:
                break;
        }
    } catch (error) {
        yield put(actionCreators.pvmError(error.response.data));
    }
}

export const pvmSagas = [
    takeLatest(actionTypes.SEARCH_PVM, searchPvm),
    takeEvery(actionTypes.GET_PVM_TASKS, getPvmTasks),
    takeLatest(actionTypes.GET_PVM_SINGLE, getPvmSingle),
    takeLatest(actionTypes.GET_PVM_TASK_SINGLE, getPvmTaskSingle),
    takeLatest(actionTypes.CREATE_PVM, createPvm),
    takeLatest(actionTypes.CREATE_PVM_TASK, createPvmTask),
    takeLatest(actionTypes.EDIT_PVM, editPvm),
    takeLatest(actionTypes.EDIT_PVM_TASK, editPvmTask),
    takeLatest(actionTypes.DELETE_PVM, deletePvm),
    takeLatest(actionTypes.DELETE_PVM_TASK, deletePvmTask)
];