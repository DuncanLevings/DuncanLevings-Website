/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import PropTypes from 'prop-types';
import './Presets.scss';

class Presets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="Presets">
                <h1>Presets component</h1>
            </div>
        );
    }
}

Presets.propTypes = {};

Presets.defaultProps = {};

export default Presets;
