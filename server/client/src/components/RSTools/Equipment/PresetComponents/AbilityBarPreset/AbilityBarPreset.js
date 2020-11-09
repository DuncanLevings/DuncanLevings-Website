/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import PropTypes from 'prop-types';
import './AbilityBarPreset.scss';

class AbilityBarPreset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="AbilityBarPreset">
                <h1>AbilityBarPreset component</h1>
            </div>
        );
    }
}

AbilityBarPreset.propTypes = {};

AbilityBarPreset.defaultProps = {};

export default AbilityBarPreset;
