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

export function searchDailyAPI(type, filter) {
  return api.request({
    method: 'get',
    url: `/api/daily/search_dailys/${type}/${filter}`,
  }).then(res => res.data);
}

export function addDailyAPI(data) {
  return api.request({
    method: 'post',
    url: '/api/daily/add',
    data: data
  }).then(res => res.data);
}

export function hideDailyAPI(data) {
  return api.request({
    method: 'post',
    url: '/api/daily/hide_daily',
    data: data
  }).then(res => res.data.dailys);
}

export function createDailyAPI(formData) {
  return api.request({
    method: 'post',
    url: '/api/daily/create',
    data: formData
  });
}

export function editDailyAPI(formData) {
  return api.request({
    method: 'post',
    url: '/api/daily/edit',
    data: formData
  });
}

export function deleteDailyAPI(dailyId) {
  return api.request({
    method: 'delete',
    url: `/api/daily/delete/${dailyId}`
  }).then(res => res.data.dailys);
}

export function reorderDailyAPI(data) {
  return api.request({
    method: 'post',
    url: '/api/daily/reorder',
    data: data
  }).then(res => res.data.dailys);
}