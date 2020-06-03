/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NAVBAR_TYPE } from 'consts';
import { RESUME_ROUTES } from 'consts/Resume_Consts';
import ResumeHome from 'components/Resume/ResumeHome/ResumeHome.lazy';
import NavBarMain from 'components/navbar/navbarMain/navbarMain.lazy';

const ResumeRouter = (props) => (
    <div className="Resume">
        <NavBarMain type={NAVBAR_TYPE.RESUME} />
        <Switch>
            <Route path={RESUME_ROUTES.HOME} component={ResumeHome} />
        </Switch>
    </div>
)
export default ResumeRouter;