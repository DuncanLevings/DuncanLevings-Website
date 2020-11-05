/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import PropTypes from 'prop-types';
import './Abilitys.scss';

class Abilitys extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="Abilitys">
                <h1>Abilitys component</h1>
            </div>
        );
    }
}

Abilitys.propTypes = {};

Abilitys.defaultProps = {};

export default Abilitys;
