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
import { RESUME_ROUTES } from 'consts/Resume_Consts';
import PrivateRoute from './PrivateRoute';
import NavBarMain from 'components/navbar/navbarMain/navbarMain.lazy';
import Portfolio from 'components/Resume/Portfolio/Portfolio.lazy';
import ResumeHome from 'components/Resume/ResumeHome/ResumeHome.lazy';
import Login from 'components/navbar/Login/Login.lazy';
import Footer from 'components/navbar/Footer/Footer.lazy';
import AdminDash from 'components/Resume/AdminDash/AdminDash.lazy';
import AdminDashPortfolio from 'components/Resume/AdminDash/AdminDashPortfolio/AdminDashPortfolio.lazy';
import AdminDashResume from 'components/Resume/AdminDash/AdminDashResume/AdminDashResume.lazy';
import NotFound from 'errors/NotFound';
import PropTypes from 'prop-types';

class ResumeRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getUser();
    }

    render() {
        return (
            <div className="Resume">
                <NavBarMain type={NAVBAR_TYPE.RESUME} />
                <Switch>
                    <Route exact path={RESUME_ROUTES.PORTFOLIO} component={Portfolio} />
                    <Route exact path={RESUME_ROUTES.HOME} component={ResumeHome} />
                    <Route exact path={RESUME_ROUTES.LOGIN} render={(props) => <Login {...props} type={LOGIN_TYPE.ADMIN} />} /> 
                    <PrivateRoute exact path={RESUME_ROUTES.ADMIN_DASH} redirect={RESUME_ROUTES.HOME} component={AdminDash} />
                    <PrivateRoute exact path={RESUME_ROUTES.ADMIN_RESUME} redirect={RESUME_ROUTES.HOME} component={AdminDashResume} />
                    <PrivateRoute exact path={RESUME_ROUTES.ADMIN_PORTFOLIO} redirect={RESUME_ROUTES.HOME} component={AdminDashPortfolio} />
                    <Route component={NotFound} />
                </Switch>
                <Footer type={LOGIN_TYPE.ADMIN} />
            </div>
        );
    }
}

ResumeRouter.propTypes = {
    getUser: PropTypes.func
};

const mapDispatchToProps = dispatch => bindActionCreators({ getUser }, dispatch);

export default withRouter(connect(null, mapDispatchToProps)(ResumeRouter));