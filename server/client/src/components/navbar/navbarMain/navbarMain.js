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
import ***REMOVED*** RESUME_ROOT, RUNESCAPE_ROOT ***REMOVED*** from 'constants/routeConstants';
import ***REMOVED*** logoutUser ***REMOVED*** from 'store/actions/userActions';
import './navbarMain.scss';

class navbarMain extends React.Component ***REMOVED***
    constructor(props) ***REMOVED***
        super(props);
        this.state = ***REMOVED******REMOVED***
    ***REMOVED***

    componentDidMount() ***REMOVED***
    ***REMOVED***

    logout = () => ***REMOVED***
        this.props.logoutUser();
    ***REMOVED***

    render() ***REMOVED***
        const ***REMOVED*** isAuthenticated ***REMOVED*** = this.props.userReducer;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to=***REMOVED***RESUME_ROOT***REMOVED***>Navbar</Link>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to=***REMOVED***RUNESCAPE_ROOT***REMOVED*** hidden=***REMOVED***!isAuthenticated***REMOVED***>Home</Link>
                            </li>
                        </ul>
                        <Button variant="primary" type="submit" className="btn float-right" onClick=***REMOVED***this.logout***REMOVED*** hidden=***REMOVED***!isAuthenticated***REMOVED***>Logout</Button>
                    </div>
                </nav>
            </div>
        );
    ***REMOVED***
***REMOVED***

navbarMain.propTypes = ***REMOVED***
    logoutUser: PropTypes.func,
    userReducer: PropTypes.object
***REMOVED***;

const mapStateToProps = state => ***REMOVED***
    return ***REMOVED***
        userReducer: state.userReducer
    ***REMOVED***;
***REMOVED***

const mapDispatchToProps = dispatch => bindActionCreators(***REMOVED*** logoutUser ***REMOVED***, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(navbarMain));
