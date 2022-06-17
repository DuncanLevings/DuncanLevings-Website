/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from 'store/actions/userActions';
import { NAVBAR_TYPE, LOGIN_TYPE } from 'consts';
import { BUDGET_ROUTES } from 'consts/Budget_Consts';
import PrivateRoute from './PrivateRoute';
import NavBarMain from 'components/navbar/navbarMain/navbarMain.lazy';
import Login from 'components/navbar/Login/Login.lazy';
import ForgotPassword from 'components/navbar/ForgotPassword/ForgotPassword.lazy';
import Footer from 'components/navbar/Footer/Footer.lazy';
import NotFound from 'errors/NotFound';
import PropTypes from 'prop-types';

class BudgetRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getUser();
    }

    render() {
        return (
            <div className="Budget">
                <NavBarMain type={NAVBAR_TYPE.RESUME} />
                <Switch>
                    <Route exact path={BUDGET_ROUTES.LOGIN} render={(props) => <Login {...props} type={LOGIN_TYPE.BUDGET} />} />
                    <Route exact path={BUDGET_ROUTES.FORGOTPASS} component={ForgotPassword} />
                    {/* <PrivateRoute exact path={BUDGET_ROUTES.DASH} redirect={BUDGET_ROUTES.LOGIN} component={} /> */}
                </Switch>
                <Footer type={LOGIN_TYPE.BUDGET} />
            </div>
        );
    }
}

BudgetRouter.propTypes = {
    getUser: PropTypes.func
};

const mapDispatchToProps = dispatch => bindActionCreators({ getUser }, dispatch);

export default withRouter(connect(null, mapDispatchToProps)(BudgetRouter));
