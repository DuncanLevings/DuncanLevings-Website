/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Container } from 'react-bootstrap';
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
            <Container>
                <div className="Presets">
                    
                </div>
            </Container>

        );
    }
}

Presets.propTypes = {};

Presets.defaultProps = {};

export default Presets;
