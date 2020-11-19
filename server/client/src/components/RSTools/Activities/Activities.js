/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import { Card, CardDeck, Container } from 'react-bootstrap';
import './Activities.scss';

class Activities extends React.Component {
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
        return (
            <Container>
                <div className="Activities">
                    <CardDeck>
                        <Card onClick={() => this.navigate(RSTOOL_ROUTES.ACTIVITY)}>
                            <Card.Body>
                                <Card.Title>Activity</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card onClick={() => this.navigate(RSTOOL_ROUTES.ACTIVITIES)}>
                            <Card.Body>
                                <Card.Title>Traveling Merchant</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card onClick={() => this.navigate(RSTOOL_ROUTES.ACTIVITIES)}>
                            <Card.Body>
                                <Card.Title>Guides</Card.Title>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                </div>
            </Container>
        );
    }
}

export default withRouter(Activities);
