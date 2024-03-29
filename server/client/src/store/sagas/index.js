/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import { all } from 'redux-saga/effects';
import {
  userSagas
} from './userSaga';
import { emailSagas } from './Resume/emailSaga';
import { imageSagas } from './Tools/imageSaga';
import { dailySagas } from './RSTools/dailySaga';
import { activitySagas } from './RSTools/activitySaga';
import { equipmentSagas } from './RSTools/equipmentSaga';
import { presetSagas } from './RSTools/presetSaga';
import { farmRunSagas } from './RSTools/farmRunSaga';
import { pvmSagas } from './RSTools/pvmSaga';
import { bronzeManSagas } from './RSTools/bronzeManSaga';

export default function* rootSaga() {
  yield all([
    ...userSagas,
    ...emailSagas,
    ...imageSagas,
    ...dailySagas,
    ...activitySagas,
    ...equipmentSagas,
    ...presetSagas,
    ...farmRunSagas,
    ...pvmSagas,
    ...bronzeManSagas
  ]);
}