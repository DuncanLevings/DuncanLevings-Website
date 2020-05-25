/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** bindActionCreators ***REMOVED*** from 'redux';
import ***REMOVED*** Button ***REMOVED*** from 'react-bootstrap';
import ***REMOVED*** Link, withRouter ***REMOVED*** from 'react-router-dom';
import ***REMOVED*** RESUME_ROOT, RUNESCAPE_ROOT, RS ***REMOVED*** from 'constants/routeConstants';
import ***REMOVED*** logoutUser ***REMOVED*** from 'actions/userActions';
import './navbarMain.css';

class navbarMain extends React.Component ***REMOVED***
    constructor(props) ***REMOVED***
        super(props);
        this.state = ***REMOVED******REMOVED***
    ***REMOVED***

    componentDidMount() ***REMOVED***
    ***REMOVED***

    login = () => ***REMOVED***
        this.props.history.push(RS.LOGIN);
    ***REMOVED***

    logout = () => ***REMOVED***
        this.props.logoutUser();
    ***REMOVED***

    render() ***REMOVED***
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to=***REMOVED***RESUME_ROOT***REMOVED***>Navbar</Link>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to=***REMOVED***RUNESCAPE_ROOT***REMOVED***>Home</Link>
                            </li>
                        </ul>
                        <Button variant="primary" type="submit" className="btn float-right mr-1" onClick=***REMOVED***this.login***REMOVED***>Login</Button>
                        <Button variant="primary" type="submit" className="btn float-right" onClick=***REMOVED***this.logout***REMOVED***>Logout</Button>
                    </div>
                </nav>
            </div>
        );
    ***REMOVED***
***REMOVED***

navbarMain.propTypes = ***REMOVED***
    logoutUser: PropTypes.func
***REMOVED***;

const mapDispatchToProps = dispatch => bindActionCreators(***REMOVED*** logoutUser ***REMOVED***, dispatch);

export default withRouter(connect(null, mapDispatchToProps)(navbarMain));