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

const FARMRUNS = RSTOOL_ROOT + '/farmruns';
const PVM = RSTOOL_ROOT + '/pvm';

// ACTIVITIES

const ACTIVITIES = RSTOOL_ROOT + '/activities';
const VIS_NEMI = ACTIVITIES + '/vis-and-nemi'

// EQUIPMENT

const EQUIPMENT = RSTOOL_ROOT + '/equipment'
const PRESETS = EQUIPMENT + '/presets'
const PRESET_BUILDER = PRESETS + '/builder'
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
    ACTIVITIES,
    DAILYSEARCH,
    ADDDAILY,
    EDITORDER,
    EDITDAILY,
    EDITDAILY_PARAM,
    VIS_NEMI,
    EQUIPMENT,
    PRESETS,
    PRESET_BUILDER,
    ITEMS,
    ABILITYS
}