/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { Card, Spinner } from 'react-bootstrap';
import './NemiForest.scss';

class NemiForest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        const { isFetchingNemi, nemiForest } = this.props.activityReducer;

        return (
            <div className="NemiForest">
                {isFetchingNemi || !nemiForest ?
                    <span>Fetching Image... <Spinner animation="border" variant="light" /></span> :
                    <Card.Img variant="top" src={nemiForest.url} />
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        activityReducer: state.activityReducer
    };
}

export default connect(mapStateToProps, null)(NemiForest);
