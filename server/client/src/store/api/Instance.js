/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import axios from 'axios';
import { URL } from "config.js"
import store from 'store';
import { getUser, logoutUser } from '../actions/userActions';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const axiosInstance = axios.create({
    baseURL: URL
});

const refreshAuthLogic = () =>
    axiosInstance.get('/api/users/refresh-token')
        .then(() => {
            // store.dispatch(getUser());
            return Promise.resolve();
        })
        .catch(() => {
            store.dispatch(logoutUser());
        });

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);

export default axiosInstance;
