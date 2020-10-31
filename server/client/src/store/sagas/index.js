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
  hideDailyWatcher
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
    searchDailyWatcher(),
    addDailyWatcher(),
    hideDailyWatcher(),
    createDailyWatcher(),
    editDailyWatcher(),
    deleteDailyWatcher(),
    reorderDailyWatcher()
  ]);
}