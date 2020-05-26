/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import ***REMOVED*** all ***REMOVED*** from 'redux-saga/effects';
import ***REMOVED*** getUserWatcher, loginUserWatcher, logoutUserWatcher, signupUserWatcher ***REMOVED*** from 'store/sagas/userSaga';

export default function* rootSaga() ***REMOVED***
    yield all([
      getUserWatcher(),
      loginUserWatcher(),
      logoutUserWatcher(),
      signupUserWatcher()
    ]);
  ***REMOVED***