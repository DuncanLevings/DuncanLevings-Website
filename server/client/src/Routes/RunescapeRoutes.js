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
import { NAVBAR_TYPE, LOGIN_TYPE } from 'consts';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import PrivateRoute from './PrivateRoute';
import NavBarMain from 'components/navbar/navbarMain/navbarMain.lazy';
import Notification from 'components/notification/Notification/Notification.lazy';
import Login from 'components/navbar/Login/Login.lazy';
import SignUp from 'components/navbar/SignUp/SignUp.lazy';
import ForgotPassword from 'components/navbar/ForgotPassword/ForgotPassword.lazy';
import RSDash from 'components/RSTools/RSDash/RSDash.lazy';
import Dailys from 'components/RSTools/Dailys/Dailys.lazy';
import SearchDaily from 'components/RSTools/Dailys/SearchDaily/SearchDaily.lazy';
import AddDaily from 'components/RSTools/Dailys/AddDaily/AddDaily.lazy';
import Footer from 'components/navbar/Footer/Footer.lazy';
import NotFound from 'errors/NotFound';
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
                <NavBarMain type={NAVBAR_TYPE.RS_TOOLS}/>
                <Notification />
                <Switch>
                    <Route exact path={RSTOOL_ROUTES.LOGIN} render={(props) => <Login {...props} type={LOGIN_TYPE.RS_TOOLS} />} /> 
                    <Route exact path={RSTOOL_ROUTES.SIGNUP} component={SignUp} /> 
                    <Route exact path={RSTOOL_ROUTES.FORGOTPASS} component={ForgotPassword} /> 
                    <PrivateRoute exact path={RSTOOL_ROUTES.DASH} redirect={RSTOOL_ROUTES.LOGIN} component={RSDash} />
                    <PrivateRoute exact path={RSTOOL_ROUTES.DAILYS} redirect={RSTOOL_ROUTES.LOGIN} component={Dailys} />
                    <PrivateRoute exact path={RSTOOL_ROUTES.DAILYSEARCH} redirect={RSTOOL_ROUTES.LOGIN} component={SearchDaily} />
                    <PrivateRoute exact path={RSTOOL_ROUTES.ADDDAILY} redirect={RSTOOL_ROUTES.LOGIN} component={AddDaily} />
                    <Route component={NotFound} />
                </Switch>
                <Footer type={LOGIN_TYPE.RS_TOOLS} />
            </div>
        );
    }
}

RSRouter.propTypes = {
    getUser: PropTypes.func
};

const mapDispatchToProps = dispatch => bindActionCreators({ getUser }, dispatch);

export default withRouter(connect(null, mapDispatchToProps)(RSRouter));
