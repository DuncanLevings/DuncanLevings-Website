/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

export const RSTOOL_ROOT = '/rs-tools'

const DASH = RSTOOL_ROOT;
const LOGIN = RSTOOL_ROOT + '/login';
const SIGNUP = RSTOOL_ROOT + '/sign-up';
const FORGOTPASS = RSTOOL_ROOT + '/forgot-pasword';
const DAILYS = RSTOOL_ROOT + '/dailys';
const FARMRUNS = RSTOOL_ROOT + '/farmruns';
const PVM = RSTOOL_ROOT + '/pvm';
const ACTIVITIES = RSTOOL_ROOT + '/activities';
const DAILYSEARCH = DAILYS + "/search";
const ADDDAILY = DAILYS + "/new";
const EDITORDER = DAILYS + "/edit-order";
const EDITDAILY = DAILYS + "/edit/:dailyId";
const EDITDAILY_PARAM = DAILYS + "/edit/";

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
    EDITDAILY_PARAM
}