/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { NAVBAR_TYPE } from 'consts';
import { RESUME_ROUTES } from 'consts/Resume_Consts';
import ResumeHome from 'components/Resume/ResumeHome/ResumeHome.lazy';
import NavBarMain from 'components/navbar/navbarMain/navbarMain.lazy';

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
                    <Route path={RESUME_ROUTES.HOME} component={ResumeHome} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(ResumeRouter);