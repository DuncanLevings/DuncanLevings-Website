/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** Button ***REMOVED*** from 'react-bootstrap';
import ***REMOVED*** withRouter ***REMOVED*** from "react-router";
import ***REMOVED*** Link ***REMOVED*** from 'react-router-dom';
import api from 'api/Instance';
import './navbarMain.css';

class navbarMain extends React.Component ***REMOVED***
    constructor() ***REMOVED***
        super();
        this.state = ***REMOVED******REMOVED***
    ***REMOVED***

    componentDidMount() ***REMOVED***

    ***REMOVED***

    login = () => ***REMOVED***
        this.props.history.push("/login");
    ***REMOVED***

    logout = () => ***REMOVED***
        api.get("/api/users/logout").then(() => this.props.history.push("/"));
    ***REMOVED***

    render() ***REMOVED***
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to=***REMOVED***"/"***REMOVED***>Navbar</Link>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to=***REMOVED***"/home"***REMOVED***>Home</Link>
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

navbarMain.propTypes = ***REMOVED******REMOVED***;

navbarMain.defaultProps = ***REMOVED******REMOVED***;

export default withRouter(navbarMain);
