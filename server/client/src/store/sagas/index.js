/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import { all } from 'redux-saga/effects';
import {
  userSagas
} from './userSaga';
import { emailSagas } from './emailSaga';
import { imageSagas } from './imageSaga';
import { dailySagas } from './dailySaga';
import { activitySagas } from './activitySaga';
import { equipmentSagas } from './equipmentSaga';

export default function* rootSaga() {
  yield all([
    ...userSagas,
    ...emailSagas,
    ...imageSagas,
    ...dailySagas,
    ...activitySagas,
    ...equipmentSagas
  ]);
}