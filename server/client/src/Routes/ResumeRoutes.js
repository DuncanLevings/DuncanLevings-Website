/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import ***REMOVED*** Switch, Route ***REMOVED*** from 'react-router-dom';
import ***REMOVED*** RESUME ***REMOVED*** from 'constants/routeConstants';
import ResumeHome from 'components/Resume/ResumeHome/ResumeHome.lazy';

const ResumeRouter = (props) => (
    <Switch>
        <Route path=***REMOVED***RESUME.HOME***REMOVED*** component=***REMOVED***ResumeHome***REMOVED*** />
    </Switch>
)
export default ResumeRouter;