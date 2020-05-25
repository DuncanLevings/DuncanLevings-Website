/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import ***REMOVED*** Switch, Route ***REMOVED*** from 'react-router-dom';
import ResumeRouter from 'Routes/ResumeRoutes';
import RSRouter from 'Routes/RunescapeRoutes';
import ***REMOVED*** RESUME_ROOT, RUNESCAPE_ROOT ***REMOVED*** from 'constants/routeConstants';

const Router = (props) => (
    <Switch>
        <Route exact path=***REMOVED***RESUME_ROOT***REMOVED*** component=***REMOVED***ResumeRouter***REMOVED*** />
        <Route path=***REMOVED***RUNESCAPE_ROOT***REMOVED*** component=***REMOVED***RSRouter***REMOVED*** />
    </Switch>
)
export default Router;