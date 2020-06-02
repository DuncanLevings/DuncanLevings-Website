/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Switch, Route , withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from '@actions/userActions';
import { RSTOOL_ROUTES } from '@rstoolsConsts';
import PrivateRoute from './PrivateRoute';
import NavBarMain from '@navbarComponents/navbarMain/navbarMain.lazy';
import Login from '@navbarComponents/Login/Login.lazy';
import SignUp from '@navbarComponents/SignUp/SignUp.lazy';
import ForgotPassword from '@navbarComponents/ForgotPassword/ForgotPassword.lazy';
import RSDash from '@rstoolComponents/RSDash/RSDash.lazy';
import PropTypes from 'prop-types';

class RSRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getUser();
    }

    render() {
        return (
            <div className="RSTools">
                <NavBarMain />
                <Switch>
                    <Route exact path={RSTOOL_ROUTES.LOGIN} component={Login} /> 
                    <Route exact path={RSTOOL_ROUTES.SIGNUP} component={SignUp} /> 
                    <Route exact path={RSTOOL_ROUTES.FORGOTPASS} component={ForgotPassword} /> 
                    <PrivateRoute exact path={RSTOOL_ROUTES.DASH} component={RSDash} />
                </Switch>
            </div>
        );
    }
}

Login.propTypes = {
    getUser: PropTypes.func
};

const mapDispatchToProps = dispatch => bindActionCreators({ getUser }, dispatch);

export default withRouter(connect(null, mapDispatchToProps)(RSRouter));
