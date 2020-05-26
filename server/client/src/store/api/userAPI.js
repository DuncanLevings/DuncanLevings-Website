/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import api from 'store/api/Instance';

export function getUserAPI() ***REMOVED***
    return api.request(***REMOVED***
        method: 'get',
        url: '/api/users'
      ***REMOVED***).then(res => res.data.user );
***REMOVED***

export function loginAPI(authData) ***REMOVED***
    return api.request(***REMOVED***
        method: 'post',
        url: '/api/users/login',
        data: authData
      ***REMOVED***).then(res => res.data.user );
***REMOVED***

export function logoutAPI() ***REMOVED***
    return api.request(***REMOVED***
        method: 'get',
        url: '/api/users/logout'
      ***REMOVED***);
***REMOVED***