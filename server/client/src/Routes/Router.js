/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ResumeRouter from 'Routes/ResumeRoutes';
import RSRouter from 'Routes/RunescapeRoutes';
import { RESUME_ROOT, RUNESCAPE_ROOT } from 'constants/routeConstants';

const Router = (props) => (
    <Switch>
        <Route exact path={RESUME_ROOT} component={ResumeRouter} />
        <Route path={RUNESCAPE_ROOT} component={RSRouter} />
    </Switch>
)
export default Router;