/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import PropTypes from 'prop-types';
import './EquipmentPreset.scss';

class EquipmentPreset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="EquipmentPreset">
                <h1>EquipmentPreset component</h1>
            </div>
        );
    }
}

EquipmentPreset.propTypes = {};

EquipmentPreset.defaultProps = {};

export default EquipmentPreset;
