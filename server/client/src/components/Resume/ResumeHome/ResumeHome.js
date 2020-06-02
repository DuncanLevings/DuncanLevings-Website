/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { RSTOOL_ROOT } from 'consts';
import './ResumeHome.scss';

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
                <Link className="nav-link" to={RSTOOL_ROOT}>Runescape Tools</Link>
            </div>
        );
    }
}

export default ResumeHome;
