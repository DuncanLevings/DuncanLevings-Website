/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import './ResumeHome.css';
import ***REMOVED*** RUNESCAPE_ROOT ***REMOVED*** from 'constants/routeConstants';
import ***REMOVED*** Link ***REMOVED*** from 'react-router-dom';

class ResumeHome extends React.Component ***REMOVED***
    constructor(props) ***REMOVED***
        super(props);
        this.state = ***REMOVED******REMOVED***
    ***REMOVED***

    componentDidMount() ***REMOVED***

    ***REMOVED***

    render() ***REMOVED***
        return (
            <div className="ResumeHome">
                <h1>ResumeHome component</h1>
                <Link className="nav-link" to=***REMOVED***RUNESCAPE_ROOT***REMOVED***>Runescape Tools</Link>
            </div>
        );
    ***REMOVED***
***REMOVED***

export default ResumeHome;
