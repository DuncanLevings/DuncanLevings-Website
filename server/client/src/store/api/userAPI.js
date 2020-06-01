/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import api from 'store/api/Instance';

export function getUserAPI() {
  return api.request({
    method: 'get',
    url: '/api/users'
  }).then(res => res.data.user);
}

export function loginAPI(authData) {
  return api.request({
    method: 'post',
    url: '/api/users/login',
    data: authData
  }).then(res => res.data.user);
}

export function logoutAPI() {
  return api.request({
    method: 'get',
    url: '/api/users/logout'
  });
}

export function signUpAPI(authData) {
  return api.request({
    method: 'post',
    url: '/api/users/register',
    data: authData
  });
}