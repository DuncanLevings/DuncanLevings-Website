/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import api from './Instance';

export function nemiForestAPI() {
  return api.request({
    method: 'get',
    url: '/api/activity/nemi_forest',
  }).then(res => res.data);
}
