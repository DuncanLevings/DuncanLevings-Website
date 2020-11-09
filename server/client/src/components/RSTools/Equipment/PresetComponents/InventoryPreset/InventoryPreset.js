/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import PropTypes from 'prop-types';
import './InventoryPreset.scss';

class InventoryPreset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="InventoryPreset">
                <h1>InventoryPreset component</h1>
            </div>
        );
    }
}

InventoryPreset.propTypes = {};

InventoryPreset.defaultProps = {};

export default InventoryPreset;
