/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Container, Spinner } from 'react-bootstrap';
import { getLastestNemi } from 'store/actions/activityActions';
import PropTypes from 'prop-types';
import './VisNemi.scss';

class VisNemi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getLastestNemi();
    }

    render() {
        const { isFetching, nemiForest } = this.props.activityReducer;

        return (
            <Container>
                <div className="VisNemi">
                    <Card>
                        <Card.Img variant="top" src="/static_images/desk.jpg" />
                    </Card>
                    <div className="spacer-h-3" />
                    <Card>
                        {isFetching || !nemiForest ?
                            <span>Fetching Image... <Spinner animation="border" variant="light" /></span> :
                            <Card.Img variant="top" src={nemiForest.url} />
                        }
                    </Card>
                </div>
            </Container>
        );
    }
}

VisNemi.propTypes = {
    getLastestNemi: PropTypes.func
};

const mapStateToProps = state => {
    return {
        activityReducer: state.activityReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getLastestNemi }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VisNemi);