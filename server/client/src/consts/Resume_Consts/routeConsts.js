/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

export const RESUME_ROOT = '/';

const HOME = RESUME_ROOT;
const PORTFOLIO = RESUME_ROOT + "portfolio/:project?";
const PORTFOLIO_PARAM = RESUME_ROOT + "portfolio/";
const LOGIN = RESUME_ROOT + "login";
const ADMIN_DASH = RESUME_ROOT + "dash";
const ADMIN_RESUME = ADMIN_DASH + "/resume";
const ADMIN_PORTFOLIO = ADMIN_DASH + "/portfolio";
const ADMIN_PROJECT = ADMIN_PORTFOLIO + "/project";
const HASH_HOME = RESUME_ROOT + "#home";
const HASH_PROFESSIONAL = RESUME_ROOT + "#professional";
const HASH_EXPERIENCE = RESUME_ROOT + "#experience";
const HASH_PORTFOLIO = RESUME_ROOT + "#portfolio";
const HASH_CONTACT = RESUME_ROOT + "#contact";

export const RESUME_ROUTES = {
    HOME,
    PORTFOLIO,
    PORTFOLIO_PARAM,
    LOGIN,
    ADMIN_DASH,
    ADMIN_RESUME,
    ADMIN_PORTFOLIO,
    ADMIN_PROJECT,
    HASH_HOME,
    HASH_PROFESSIONAL,
    HASH_EXPERIENCE,
    HASH_PORTFOLIO,
    HASH_CONTACT
}
