/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import axios from 'axios';
import { URL } from "config.js"
import store from 'store';
import { getUser, logoutUser } from 'store/actions/userActions';

const axiosInstance = axios.create({
    baseURL: URL
});

const isHandlerEnabled = (config={}) => {
    return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ? false : true
}

const errorHandler = (error) => {
    if (isHandlerEnabled(error.config)) {
        if (error.response.status === 401 && !error.config._retry) {
            error.config._retry = true;
            axiosInstance.get("/api/users/refresh-token").then(() => {
                store.dispatch(getUser());
                return axios(error.config);
            })
            .catch(() => {
                store.dispatch(logoutUser());
            });
        }
    }
    return Promise.reject({ ...error });
}

axiosInstance.interceptors.response.use(
    response => { return response; },
    error => errorHandler(error)
);

export default axiosInstance;
