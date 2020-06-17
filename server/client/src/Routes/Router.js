/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { RESUME_ROOT, RSTOOL_ROOT } from 'consts';
import ResumeRouter from './ResumeRoutes';
import RSRouter from './RunescapeRoutes';

const Router = (props) => (
    <Switch>
        <Route path={RSTOOL_ROOT} component={RSRouter} />
        <Route path={RESUME_ROOT} component={ResumeRouter} />
    </Switch>
)
export default Router;