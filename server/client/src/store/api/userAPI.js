/*
 * Filename: c:\Users\Duncan\Documents\personal_website\server\client\src\api\userAPI.js
 * Path: c:\Users\Duncan\Documents\personal_website\server\client
 * Created Date: Wednesday, May 20th 2020, 4:10:52 pm
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