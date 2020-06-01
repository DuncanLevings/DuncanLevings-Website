/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import './ResumeHome.scss';
import { RUNESCAPE_ROOT } from 'constants/routeConstants';
import { Link } from 'react-router-dom';

class ResumeHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="ResumeHome">
                <h1>ResumeHome component</h1>
                <Link className="nav-link" to={RUNESCAPE_ROOT}>Runescape Tools</Link>
            </div>
        );
    }
}

export default ResumeHome;
