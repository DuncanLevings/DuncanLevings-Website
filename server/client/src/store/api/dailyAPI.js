/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import api from './Instance';

export function getDailyAPI(type) {
  return api.request({
    method: 'get',
    url: `/api/daily/get_dailys/${type}`,
  }).then(res => res.data.dailys);
}

export function createDailyAPI(formData) {
  return api.request({
    method: 'post',
    url: '/api/daily/create',
    data: formData
  });
}
