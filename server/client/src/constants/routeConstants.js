/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

//RESUME ROUTES
export const RESUME_ROOT = '/';

const HOME = RESUME_ROOT;

export const RESUME = {
    HOME
}

//RUNESCAPE ROUTES
export const RUNESCAPE_ROOT = '/rs-tools'

const DASH = RUNESCAPE_ROOT;
const LOGIN = RUNESCAPE_ROOT + '/login';
const SIGNUP = RUNESCAPE_ROOT + '/sign-up';
const FORGOTPASS = RUNESCAPE_ROOT + '/forgot-pasword';

export const RS = {
    DASH,
    LOGIN,
    SIGNUP,
    FORGOTPASS
}