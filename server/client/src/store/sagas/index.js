/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import { all } from 'redux-saga/effects';
import {
  getUserWatcher,
  loginUserWatcher,
  logoutUserWatcher,
  signupUserWatcher
} from './userSaga';
import { sendMailWatcher } from './emailSaga';
import { uploadWatcher } from './imageSaga';
import {
  addDailyWatcher,
  createDailyWatcher,
  deleteDailyWatcher,
  editDailyWatcher,
  getDailyWatcher,
  reorderDailyWatcher,
  searchDailyWatcher,
  hideDailyWatcher,
  getSingleDailyWatcher,
  getWeeklyWatcher,
  getMonthlyWatcher,
  hideMonthlyWatcher,
  hideWeeklyWatcher,
  deleteWeeklyWatcher,
  deleteMonthlyWatcher
} from './dailySaga';

export default function* rootSaga() {
  yield all([
    getUserWatcher(),
    loginUserWatcher(),
    logoutUserWatcher(),
    signupUserWatcher(),
    sendMailWatcher(),
    uploadWatcher(),
    getDailyWatcher(),
    getWeeklyWatcher(),
    getMonthlyWatcher(),
    getSingleDailyWatcher(),
    searchDailyWatcher(),
    addDailyWatcher(),
    hideDailyWatcher(),
    hideWeeklyWatcher(),
    hideMonthlyWatcher(),
    createDailyWatcher(),
    editDailyWatcher(),
    deleteDailyWatcher(),
    deleteWeeklyWatcher(),
    deleteMonthlyWatcher(),
    reorderDailyWatcher()
  ]);
}