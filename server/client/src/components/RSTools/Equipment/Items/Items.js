/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import PropTypes from 'prop-types';
import './Items.scss';

class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="Items">
                <h1>Items component</h1>
            </div>
        );
    }
}

Items.propTypes = {};

Items.defaultProps = {};

export default Items;
