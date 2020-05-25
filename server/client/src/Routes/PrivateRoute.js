/*
 * Filename: c:\Users\Duncan\Documents\personal_website\server\client\src\Routes\PrivateRoute.js
 * Path: c:\Users\Duncan\Documents\personal_website\server\client
 * Created Date: Monday, May 25th 2020, 2:57:42 pm
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import ***REMOVED*** Route, Redirect ***REMOVED*** from "react-router-dom";
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import PropTypes from 'prop-types';
import ***REMOVED*** RS ***REMOVED*** from 'constants/routeConstants';

const PrivateRoute = (***REMOVED*** component: Component, ...rest ***REMOVED***) => (
    <Route
      ***REMOVED***...rest***REMOVED***
      render=***REMOVED***props =>
        rest.isAuthenticated ? (
          <Component ***REMOVED***...props***REMOVED*** ***REMOVED***...rest***REMOVED*** />
        ) : (
          <Redirect
            to=***REMOVED******REMOVED***
              pathname: RS.LOGIN,
              state: ***REMOVED*** from: props.location ***REMOVED***
            ***REMOVED******REMOVED***
          />
        )
      ***REMOVED***
    />
);

PrivateRoute.propTypes = ***REMOVED***
  isAuthenticated: PropTypes.bool
***REMOVED***;

const mapStateToProps = state => ***REMOVED***
    return ***REMOVED***
      isAuthenticated: state.userReducer.isAuthenticated
    ***REMOVED***;
***REMOVED***

export default connect(mapStateToProps, null)(PrivateRoute);

