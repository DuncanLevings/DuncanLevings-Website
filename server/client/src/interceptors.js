/*
 * Filename: c:\Users\Duncan\Documents\personal_website\server\client\src\interceptors.js
 * Path: c:\Users\Duncan\Documents\personal_website\server\client
 * Created Date: Tuesday, May 12th 2020, 4:45:40 pm
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import axios from 'axios';

const axiosInstance = axios.create(***REMOVED***
    baseURL: 'http://localhost:3000'
***REMOVED***);

const isHandlerEnabled = (config=***REMOVED******REMOVED***) => ***REMOVED***
    return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ? false : true
***REMOVED***

const errorHandler = (error) => ***REMOVED***
    if (isHandlerEnabled(error.config)) ***REMOVED***
      if (error.response.status(401) && !error.config._retry) ***REMOVED***
          error.config._retry = true;
          //refresh token call
          return axios(error.config);
      ***REMOVED***
    ***REMOVED***
    return Promise.reject(***REMOVED*** ...error ***REMOVED***);
  ***REMOVED***

axiosInstance.interceptors.response.use(
    response => ***REMOVED*** return response ***REMOVED***,
    error => errorHandler(error)
);