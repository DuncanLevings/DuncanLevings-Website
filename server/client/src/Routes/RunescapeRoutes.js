/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Switch, Route , withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from 'store/actions/userActions';
import { RS } from 'constants/routeConstants';
import PrivateRoute from './PrivateRoute';
import NavBarMain from 'components/navbar/navbarMain/navbarMain.lazy';
import Login from 'components/navbar/Login/Login.lazy';
import SignUp from 'components/navbar/SignUp/SignUp.lazy';
import ForgotPassword from 'components/navbar/ForgotPassword/ForgotPassword.lazy';
import RSDash from 'components/RSTools/RSDash/RSDash.lazy';
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
                    <Route exact path={RS.LOGIN} component={Login} /> 
                    <Route exact path={RS.SIGNUP} component={SignUp} /> 
                    <Route exact path={RS.FORGOTPASS} component={ForgotPassword} /> 
                    <PrivateRoute exact path={RS.DASH} component={RSDash} />
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
