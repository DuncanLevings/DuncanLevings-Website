/*
 * Filename: c:\Users\Duncan\Documents\personal_website\server\client\src\index.js
 * Path: c:\Users\Duncan\Documents\personal_website\server\client
 * Created Date: Wednesday, May 20th 2020, 2:04:00 pm
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import ***REMOVED***applyMiddleware, compose, createStore***REMOVED*** from 'redux';
import ***REMOVED*** routerMiddleware ***REMOVED*** from 'connected-react-router'
import ***REMOVED*** createBrowserHistory ***REMOVED*** from 'history'
import createSagaMiddleware from 'redux-saga';
import createRootReducer from 'store/reducers';
import rootSaga from 'store/sagas'

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  createRootReducer(history),
  compose(
    applyMiddleware(sagaMiddleware, routerMiddleware(history)),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() && window.__REDUX_DEVTOOLS_EXTENSION__(***REMOVED*** trace: true, traceLimit: 25 ***REMOVED***)
  )
);

sagaMiddleware.run(rootSaga);

export default store;