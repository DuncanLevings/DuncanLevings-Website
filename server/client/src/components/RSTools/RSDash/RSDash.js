/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { Spinner, Container, CardDeck, Card } from 'react-bootstrap';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import PropTypes from 'prop-types';
import './RSDash.scss';

class RSDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    navigate = (route) => {
        this.props.history.push(route);
    }

    render() {
        const { isFetching, user } = this.props.userReducer;
        if (isFetching || !user) {
            return (<Spinner variant="light" />);
        }

        return (
            <Container>
                <div className="RSDash">
                    <CardDeck>
                        <Card onClick={() => this.navigate(RSTOOL_ROUTES.DAILYS) }>
                            <Card.Body>
                                <Card.Title>DAILYS</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card onClick={() => this.navigate(RSTOOL_ROUTES.FARMRUNS) }>
                            <Card.Body>
                                <Card.Title>FARM RUNS</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card onClick={() => this.navigate(RSTOOL_ROUTES.PVM) }>
                            <Card.Body>
                                <Card.Title>PVM</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card onClick={() => this.navigate(RSTOOL_ROUTES.ACTIVITIES) }>
                            <Card.Body>
                                <Card.Title>ACTIVITES</Card.Title>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                </div>
            </Container>
        );
    }
}

RSDash.propTypes = {
    userReducer: PropTypes.object
};

const mapStateToProps = state => {
    return {
        userReducer: state.userReducer
    };
}

export default connect(mapStateToProps, null)(RSDash);