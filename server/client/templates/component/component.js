/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import PropTypes from 'prop-types';
import './TemplateName.scss';

class TemplateName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="TemplateName">
                <h1>TemplateName component</h1>
            </div>
        );
    }
}

TemplateName.propTypes = {};

TemplateName.defaultProps = {};

export default TemplateName;
