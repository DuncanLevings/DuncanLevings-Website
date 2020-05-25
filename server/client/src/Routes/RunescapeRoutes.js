/*
 * Filename: c:\Users\Duncan\Documents\personal_website\server\client\src\Routes\RunescapeRoutes.js
 * Path: c:\Users\Duncan\Documents\personal_website\server\client
 * Created Date: Monday, May 25th 2020, 12:45:26 pm
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React, ***REMOVED*** Component ***REMOVED*** from 'react';
import ***REMOVED*** Switch, Route, Redirect ***REMOVED*** from 'react-router-dom';
import ***REMOVED*** RS ***REMOVED*** from 'constants/routeConstants';
import RSDash from 'components/RSTools/RSDash/RSDash.lazy';
import Login from 'components/navbar/Login/Login.lazy';

class RSRouter extends React.Component ***REMOVED***
    constructor(props) ***REMOVED***
        super(props);
        this.state = ***REMOVED******REMOVED***
    ***REMOVED***

    componentDidMount() ***REMOVED***
        console.log("HERE")
    ***REMOVED***

    render() ***REMOVED***
        return (
            <Switch>
                <Route path=***REMOVED***RS.LOGIN***REMOVED*** component=***REMOVED***Login***REMOVED*** /> 
                <Route path=***REMOVED***RS.DASH***REMOVED*** component=***REMOVED***RSDash***REMOVED*** />
            </Switch>
        );
    ***REMOVED***
***REMOVED***

export default RSRouter;