/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import api from './Instance';

export function uploadAPI(formData) {
  return api.request({
    method: 'post',
    url: '/api/image/upload',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  }).then(res => console.log(res));
}
