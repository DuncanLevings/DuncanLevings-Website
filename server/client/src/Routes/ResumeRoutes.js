/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { RESUME } from 'constants/routeConstants';
import ResumeHome from 'components/Resume/ResumeHome/ResumeHome.lazy';

const ResumeRouter = (props) => (
    <Switch>
        <Route path={RESUME.HOME} component={ResumeHome} />
    </Switch>
)
export default ResumeRouter;