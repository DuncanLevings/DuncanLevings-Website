/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import PropTypes from 'prop-types';
import './PvmTaskBuilder.scss';

class PvmTaskBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="PvmTaskBuilder">
                <h1>PvmTaskBuilder component</h1>
            </div>
        );
    }
}

PvmTaskBuilder.propTypes = {};

PvmTaskBuilder.defaultProps = {};

export default PvmTaskBuilder;
