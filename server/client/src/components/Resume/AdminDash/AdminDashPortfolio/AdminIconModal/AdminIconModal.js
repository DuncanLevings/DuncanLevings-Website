/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import PropTypes from 'prop-types';
import './AdminIconModal.scss';

class AdminIconModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="AdminIconModal">
                <h1>AdminIconModal component</h1>
            </div>
        );
    }
}

AdminIconModal.propTypes = {};

AdminIconModal.defaultProps = {};

export default AdminIconModal;
