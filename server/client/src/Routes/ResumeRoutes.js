/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { NAVBAR_TYPE } from 'consts';
import { RESUME_ROUTES } from 'consts/Resume_Consts';
import NavBarMain from 'components/navbar/navbarMain/navbarMain.lazy';
import Portfolio from 'components/Resume/Portfolio/Portfolio.lazy';
import ResumeHome from 'components/Resume/ResumeHome/ResumeHome.lazy';
import NotFound from 'errors/NotFound';

class ResumeRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="Resume">
                <NavBarMain type={NAVBAR_TYPE.RESUME} />
                <Switch>
                    <Route exact path={RESUME_ROUTES.PORTFOLIO} component={Portfolio} />
                    <Route exact path={RESUME_ROUTES.HOME} component={ResumeHome} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(ResumeRouter);