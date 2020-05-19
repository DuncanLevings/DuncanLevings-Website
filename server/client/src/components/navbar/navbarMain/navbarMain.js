/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** Button ***REMOVED*** from 'react-bootstrap';
import ***REMOVED*** withRouter ***REMOVED*** from "react-router";
import api from 'interceptors';
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
                    <a className="navbar-brand" href="/">Navbar</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="home">Home <span className="sr-only">(current)</span></a>
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
