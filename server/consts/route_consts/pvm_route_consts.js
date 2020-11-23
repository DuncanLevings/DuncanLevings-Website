/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

const _ROOT = '/pvm';

const SEARCH_PVM = '/search_pvm/:type/:filter';
const GET_PVM_TASKS = '/get_pvm_tasks/:type';
const GET_PVM_SINGLE = '/get_pvm/single/:pvmId';
const GET_PVM_TASK_SINGLE = '/get_pvm_tasks/single/:pvmTaskId';
const CHECK_PVM_NAME = '/check_pvm_name';
const CREATE_PVM = '/create_pvm';
const CREATE_PVM_TASK = '/create_pvm_task';
const EDIT_PVM = '/edit_pvm';
const EDIT_PVM_TASK = '/edit_pvm_task';
const DELETE_PVM = '/delete_pvm/:pvmId/:filter';
const DELETE_PVM_TASK = '/delete_pvm_task/:pvmTaskId';

module.exports = {
    _ROOT,
    SEARCH_PVM,
    GET_PVM_TASKS,
    GET_PVM_SINGLE,
    GET_PVM_TASK_SINGLE,
    CHECK_PVM_NAME,
    CREATE_PVM,
    CREATE_PVM_TASK,
    EDIT_PVM,
    EDIT_PVM_TASK,
    DELETE_PVM,
    DELETE_PVM_TASK
}