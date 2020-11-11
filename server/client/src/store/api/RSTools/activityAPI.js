/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import api from '../Instance';

export function vixWaxAPI() {
  return api.request({
    method: 'get',
    url: '/api/activity/vis_wax',
  }).then(res => res.data);
}

export function nemiForestAPI() {
  return api.request({
    method: 'get',
    url: '/api/activity/nemi_forest',
  }).then(res => res.data);
}
