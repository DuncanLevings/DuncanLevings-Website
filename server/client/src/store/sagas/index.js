/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import { all } from 'redux-saga/effects';
import { getUserWatcher, loginUserWatcher, logoutUserWatcher, signupUserWatcher } from './userSaga';

export default function* rootSaga() {
    yield all([
      getUserWatcher(),
      loginUserWatcher(),
      logoutUserWatcher(),
      signupUserWatcher()
    ]);
  }