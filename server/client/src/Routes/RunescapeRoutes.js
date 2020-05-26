/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import ***REMOVED*** Switch, Route , withRouter ***REMOVED*** from 'react-router-dom';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** bindActionCreators ***REMOVED*** from 'redux';
import ***REMOVED*** getUser ***REMOVED*** from 'store/actions/userActions';
import ***REMOVED*** RS ***REMOVED*** from 'constants/routeConstants';
import PrivateRoute from './PrivateRoute';
import NavBarMain from 'components/navbar/navbarMain/navbarMain.lazy';
import Login from 'components/navbar/Login/Login.lazy';
import SignUp from 'components/navbar/SignUp/SignUp.lazy';
import ForgotPassword from 'components/navbar/ForgotPassword/ForgotPassword.lazy';
import RSDash from 'components/RSTools/RSDash/RSDash.lazy';
import PropTypes from 'prop-types';

class RSRouter extends React.Component ***REMOVED***
    constructor(props) ***REMOVED***
        super(props);
        this.state = ***REMOVED******REMOVED***
    ***REMOVED***

    componentDidMount() ***REMOVED***
        this.props.getUser();
    ***REMOVED***

    render() ***REMOVED***
        return (
            <div className="RSTools">
                <NavBarMain />
                <Switch>
                    <Route exact path=***REMOVED***RS.LOGIN***REMOVED*** component=***REMOVED***Login***REMOVED*** /> 
                    <Route exact path=***REMOVED***RS.SIGNUP***REMOVED*** component=***REMOVED***SignUp***REMOVED*** /> 
                    <Route exact path=***REMOVED***RS.FORGOTPASS***REMOVED*** component=***REMOVED***ForgotPassword***REMOVED*** /> 
                    <PrivateRoute exact path=***REMOVED***RS.DASH***REMOVED*** component=***REMOVED***RSDash***REMOVED*** />
                </Switch>
            </div>
        );
    ***REMOVED***
***REMOVED***

Login.propTypes = ***REMOVED***
    getUser: PropTypes.func
***REMOVED***;

const mapDispatchToProps = dispatch => bindActionCreators(***REMOVED*** getUser ***REMOVED***, dispatch);

export default withRouter(connect(null, mapDispatchToProps)(RSRouter));
