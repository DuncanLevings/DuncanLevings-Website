/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React, ***REMOVED*** Component ***REMOVED*** from 'react';
import ***REMOVED*** Switch, Route, Redirect ***REMOVED*** from 'react-router-dom';
import Home from 'components/Home/Home.lazy';
import Login from 'components/navbar/Login/Login.lazy';

const Router = (props) => (
    <Switch>
        <Route exact path='/home' component=***REMOVED***Home***REMOVED*** />
        ***REMOVED***/* redirect to home if already logged in */***REMOVED***
        <Route exact path='/login' component=***REMOVED***Login***REMOVED*** /> 
    </Switch>
)
export default Router;