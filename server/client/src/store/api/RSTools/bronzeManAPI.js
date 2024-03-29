/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import api from '../Instance';

export function getItemsAPI(name) {
  return api.request({
    method: 'get',
    url: `/api/bronze_man/items/${name}`,
  }).then(res => res.data);
}

export function setAcquiredAPI(itemId) {
  return api.request({
    method: 'get',
    url: `/api/bronze_man/acquired/${itemId}`,
  }).then(res => res.data);
}

export function createItemAPI(formData) {
  return api.request({
    method: 'post',
    url: '/api/bronze_man/create',
    data: formData
  }).then(res => res.data);
}

export function deleteItemAPI(itemId) {
  return api.request({
    method: 'delete',
    url: `/api/bronze_man/delete/${itemId}`
  }).then(res => res.data);
}

export function getEnemiesAPI(name) {
  return api.request({
    method: 'get',
    url: `/api/bronze_man/enemy/${name}`,
  }).then(res => res.data);
}

export function getEnemyDataAPI(name) {
  return api.request({
    method: 'get',
    url: `/api/bronze_man/enemy/data/${name}`,
  }).then(res => res.data);
}

export function createEnemyAPI(formData) {
  return api.request({
    method: 'post',
    url: '/api/bronze_man/create/enemy',
    data: formData
  }).then(res => res.data);
}

export function deleteEnemyAPI(enemyId) {
  return api.request({
    method: 'delete',
    url: `/api/bronze_man/delete/enemy/${enemyId}`
  }).then(res => res.data);
}