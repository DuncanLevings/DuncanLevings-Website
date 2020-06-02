/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        rest.isAuthenticated ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: RSTOOL_ROUTES.LOGIN,
              state: { from: props.location }
            }}
          />
        )
      }
    />
);

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
    return {
      isAuthenticated: state.userReducer.isAuthenticated
    };
}

export default connect(mapStateToProps, null)(PrivateRoute);

