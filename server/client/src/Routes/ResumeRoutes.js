/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { RESUME_ROUTES } from 'consts/Resume_Consts';
import ResumeHome from 'components/Resume/ResumeHome/ResumeHome.lazy';

const ResumeRouter = (props) => (
    <Switch>
        <Route path={RESUME_ROUTES.HOME} component={ResumeHome} />
    </Switch>
)
export default ResumeRouter;