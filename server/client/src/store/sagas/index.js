/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import { all } from 'redux-saga/effects';
import { getUserWatcher, loginUserWatcher, logoutUserWatcher, signupUserWatcher } from './userSaga';
import { sendMailWatcher } from './emailSaga';
import { uploadWatcher } from './imageSaga';
import { createDailyWatcher, deleteDailyWatcher, editDailyWatcher, getDailyWatcher, reorderDailyWatcher } from './dailySaga';

export default function* rootSaga() {
    yield all([
      getUserWatcher(),
      loginUserWatcher(),
      logoutUserWatcher(),
      signupUserWatcher(),
      sendMailWatcher(),
      uploadWatcher(),
      getDailyWatcher(),
      createDailyWatcher(),
      editDailyWatcher(),
      deleteDailyWatcher(),
      reorderDailyWatcher()
    ]);
  }