/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import {applyMiddleware, compose, createStore} from 'redux';
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import createSagaMiddleware from 'redux-saga';
import createRootReducer from './reducers';
import rootSaga from './sagas'

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  createRootReducer(history),
  compose(
    applyMiddleware(sagaMiddleware, routerMiddleware(history)),
    process.env.NODE_ENV === "production" ? f => f :
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 })
  )
);

sagaMiddleware.run(rootSaga);

export default store;