/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import api from '../Instance';

// ITEMS
export function getItemsAPI() {
  return api.request({
    method: 'get',
    url: '/api/equipment/items',
  }).then(res => res.data);
}

export function getItemSingleAPI(itemId) {
  return api.request({
    method: 'get',
    url: `/api/equipment/item/${itemId}`,
  }).then(res => res.data);
}

export function searchItemsAPI(slots) {
  if (slots.length === 0) slots = -1; // default is no filter selected
  return api.request({
    method: 'get',
    url: `/api/equipment/search/items/${slots}`,
  }).then(res => res.data);
}

export function createItemAPI(formData, slots) {
  if (slots.length === 0) slots = -1; // default is no filter selected
  return api.request({
    method: 'post',
    url: `/api/equipment/create/item/${slots}`,
    data: formData
  }).then(res => res.data);
}

export function editItemAPI(formData, slots) {
  if (slots.length === 0) slots = -1; // default is no filter selected
  return api.request({
    method: 'post',
    url: `/api/equipment/edit/item/${slots}`,
    data: formData
  }).then(res => res.data);
}

export function deleteItemAPI(itemId, slots) {
  if (slots.length === 0) slots = -1; // default is no filter selected
  return api.request({
    method: 'delete',
    url: `/api/equipment/delete/item/${itemId}/${slots}`
  }).then(res => res.data);
}

// ABILITYS

export function getAbilityBarSingleAPI(abilityBarId) {
  return api.request({
    method: 'get',
    url: `/api/equipment/abilityBar/${abilityBarId}`,
  }).then(res => res.data);
}

export function searchAbilityBarsAPI(style) {
  return api.request({
    method: 'get',
    url: `/api/equipment/search/abilityBar/${style}`,
  }).then(res => res.data);
}

export function createAbilityBarAPI(formData, style) {
  return api.request({
    method: 'post',
    url: `/api/equipment/create/abilityBar/${style}`,
    data: formData
  }).then(res => res.data);
}

export function editAbilityBarAPI(formData, style) {
  return api.request({
    method: 'post',
    url: `/api/equipment/edit/abilityBar/${style}`,
    data: formData
  }).then(res => res.data);
}

export function deleteAbilityBarAPI(abilityBarId, style) {
  return api.request({
    method: 'delete',
    url: `/api/equipment/delete/abilityBar/${abilityBarId}/${style}`
  }).then(res => res.data);
}