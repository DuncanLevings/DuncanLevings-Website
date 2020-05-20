import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import ***REMOVED*** Provider ***REMOVED*** from 'react-redux'
import ***REMOVED*** ConnectedRouter ***REMOVED*** from 'connected-react-router'
import * as serviceWorker from 'serviceWorker';
import store, ***REMOVED*** history ***REMOVED*** from 'store';
import 'index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store=***REMOVED***store***REMOVED***>
      <ConnectedRouter history=***REMOVED***history***REMOVED***>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
