/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import api from '../Instance';

export function getFarmRunAPI(type) {
  return api.request({
    method: 'get',
    url: `/api/farmRun/type/${type}`,
  }).then(res => res.data);
}

export function createFarmRunAPI(data) {
  return api.request({
    method: 'post',
    url: '/api/farmRun/create',
    data: data
  });
}

export function editFarmRunAPI(data) {
  return api.request({
    method: 'post',
    url: '/api/farmRun/edit',
    data: data
  });
}
