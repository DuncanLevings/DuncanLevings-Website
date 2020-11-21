/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

export const RSTOOL_ROOT = '/rs-tools'

// MISC
const DASH = RSTOOL_ROOT;
const LOGIN = RSTOOL_ROOT + '/login';
const SIGNUP = RSTOOL_ROOT + '/sign-up';
const FORGOTPASS = RSTOOL_ROOT + '/forgot-pasword';

// DAILYS
const DAILYS = RSTOOL_ROOT + '/dailys';
const DAILYSEARCH = DAILYS + "/search";
const ADDDAILY = DAILYS + "/new";
const EDITORDER = DAILYS + "/edit-order";
const EDITDAILY = DAILYS + "/edit/:dailyId";
const EDITDAILY_PARAM = DAILYS + "/edit/";

// FARM RUNS

const FARMRUNS = RSTOOL_ROOT + '/farmruns';
const FARMRUN_TYPE_PARAM = FARMRUNS + '/type/'
const FARMRUN_TYPE = FARMRUNS + '/type/:farmType';
const FARMRUN_BUILDER_PARAM = FARMRUNS + '/type/builder/';
const FARMRUN_BUILDER = FARMRUNS + '/type/builder/:farmType';

// PVM

const PVM = RSTOOL_ROOT + '/pvm';
const PVM_ENEMY = PVM + '/enemy/:type';
const PVM_ENEMY_PARAM = PVM + '/enemy/';
const PVM_BUILDER = PVM + '/builder';
const PVM_TASK_BUILDER = PVM + '/task/builder';
const PVM_TASK_VIEWER = PVM + '/view/:pvmTaskId'
const PVM_TASK_VIEWER_PARAM = PVM + '/view/'

// ACTIVITIES

const ACTIVITIES = RSTOOL_ROOT + '/activities';
const ACTIVITY = ACTIVITIES + '/activity';
const ACTIVITY_BUILDER = ACTIVITIES + '/activity/builder';
const ACTIVITY_VIEWER = ACTIVITIES + '/view/:activityId'
const ACTIVITY_VIEWER_PARAM = ACTIVITIES + '/view/'

// EQUIPMENT

const EQUIPMENT = RSTOOL_ROOT + '/equipment'
const PRESETS = EQUIPMENT + '/presets'
const PRESET_BUILDER = PRESETS + '/builder'
const PRESET_VIEWER = PRESETS + '/view/:presetId'
const PRESET_VIEWER_PARAM = PRESETS + '/view/'
const ITEMS = EQUIPMENT + '/items'
const ABILITYS = EQUIPMENT + '/abilitys'

export const RSTOOL_ROUTES = {
    DASH,
    LOGIN,
    SIGNUP,
    FORGOTPASS,
    DAILYS,
    FARMRUNS,
    PVM,
    PVM_ENEMY,
    PVM_ENEMY_PARAM,
    PVM_BUILDER,
    PVM_TASK_BUILDER,
    PVM_TASK_VIEWER,
    PVM_TASK_VIEWER_PARAM,
    ACTIVITIES,
    ACTIVITY,
    ACTIVITY_BUILDER,
    ACTIVITY_VIEWER,
    ACTIVITY_VIEWER_PARAM,
    DAILYSEARCH,
    ADDDAILY,
    EDITORDER,
    EDITDAILY,
    EDITDAILY_PARAM,
    EQUIPMENT,
    PRESETS,
    PRESET_BUILDER,
    PRESET_VIEWER,
    PRESET_VIEWER_PARAM,
    ITEMS,
    ABILITYS,
    FARMRUN_TYPE_PARAM,
    FARMRUN_TYPE,
    FARMRUN_BUILDER_PARAM,
    FARMRUN_BUILDER
}