/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import PropTypes from 'prop-types';
import './PrayerPreset.scss';

class PrayerPreset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="PrayerPreset">
                <h1>PrayerPreset component</h1>
            </div>
        );
    }
}

PrayerPreset.propTypes = {};

PrayerPreset.defaultProps = {};

export default PrayerPreset;
