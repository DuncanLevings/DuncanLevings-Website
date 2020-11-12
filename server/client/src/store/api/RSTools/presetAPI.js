/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import api from '../Instance';

export function getPresetsAPI() {
  return api.request({
    method: 'get',
    url: '/api/presets/all',
  }).then(res => res.data);
}

export function getPresetingleAPI(presetId) {
  return api.request({
    method: 'get',
    url: `/api/presets/single/${presetId}`,
  }).then(res => res.data);
}

export function createPresetAPI(data) {
  return api.request({
    method: 'post',
    url: `/api/presets/create`,
    data: data
  });
}

export function editPresetAPI(data) {
  return api.request({
    method: 'post',
    url: `/api/presets/edit`,
    data: data
  });
}

export function deletePresetAPI(presetId) {
  return api.request({
    method: 'delete',
    url: `/api/presets/delete/${presetId}`
  }).then(res => res.data);
}
