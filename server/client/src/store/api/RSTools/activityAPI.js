/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import api from '../Instance';

export function getActivitiesAPI() {
  return api.request({
    method: 'get',
    url: '/api/activity/all',
  }).then(res => res.data);
}

export function getActivitySingleAPI(activityId) {
  return api.request({
    method: 'get',
    url: `/api/activity/single/${activityId}`,
  }).then(res => res.data);
}

export function createActivityAPI(data) {
  return api.request({
    method: 'post',
    url: '/api/activity/create',
    data: data
  });
}

export function editActivityAPI(data) {
  return api.request({
    method: 'post',
    url: '/api/activity/edit',
    data: data
  });
}

export function deleteActivityAPI(activityId) {
  return api.request({
    method: 'delete',
    url: `/api/activity/delete/${activityId}`
  }).then(res => res.data);
}

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
