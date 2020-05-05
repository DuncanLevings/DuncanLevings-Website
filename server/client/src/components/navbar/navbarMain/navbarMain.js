/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './navbarMain.module.css';

class navbarMain extends React.Component ***REMOVED***
    constructor() ***REMOVED***
        super();
        this.state = ***REMOVED******REMOVED***
    ***REMOVED***

    componentDidMount() ***REMOVED***

    ***REMOVED***

    render() ***REMOVED***
        return (
            <div className=***REMOVED***styles.navbarMain***REMOVED***>
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
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button>
                    </div>
                </nav>
            </div>
        );
    ***REMOVED***
***REMOVED***

navbarMain.propTypes = ***REMOVED******REMOVED***;

navbarMain.defaultProps = ***REMOVED******REMOVED***;

export default navbarMain;
