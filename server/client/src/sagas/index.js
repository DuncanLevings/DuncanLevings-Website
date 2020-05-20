/*
 * Filename: c:\Users\Duncan\Documents\personal_website\server\client\src\sagas\index.js
 * Path: c:\Users\Duncan\Documents\personal_website\server\client
 * Created Date: Wednesday, May 20th 2020, 2:14:03 pm
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import ***REMOVED*** all ***REMOVED*** from 'redux-saga/effects';
import ***REMOVED*** getUserWatcher, loginUserWatcher ***REMOVED*** from 'sagas/userSaga';

export default function* rootSaga() ***REMOVED***
    yield all([
      getUserWatcher(),
      loginUserWatcher()
    ]);
  ***REMOVED***