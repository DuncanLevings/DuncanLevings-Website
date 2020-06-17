/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Container } from 'react-bootstrap';
import './Portfolio.scss';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className="Portfolio">
                <Container className="content">
                    <h1>coming soon...</h1>
                </Container>
            </div>
        );
    }
}

export default Portfolio;
