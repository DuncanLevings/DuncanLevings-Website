/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import PropTypes from 'prop-types';
import './FamiliarPreset.scss';

class FamiliarPreset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="FamiliarPreset">
                <h1>FamiliarPreset component</h1>
            </div>
        );
    }
}

FamiliarPreset.propTypes = {};

FamiliarPreset.defaultProps = {};

export default FamiliarPreset;
