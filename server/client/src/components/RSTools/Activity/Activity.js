/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Card, CardDeck, Container } from 'react-bootstrap';
import './Activity.scss';

class Activity extends React.Component {
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
                <div className="Activity">
                    <CardDeck>
                        <Card>
                            <Card.Body>
                                <Card.Title>CLUE SETUPS</Card.Title>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                </div>
            </Container>
        );
    }
}

export default Activity;
