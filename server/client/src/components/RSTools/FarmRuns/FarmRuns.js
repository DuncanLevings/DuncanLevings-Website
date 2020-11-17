/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, CardDeck, Card } from 'react-bootstrap';
import { FARM_CONSTS, RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import PropTypes from 'prop-types';
import './FarmRuns.scss';

class FarmRuns extends React.Component {
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
                <div className="FarmRuns">
                    <CardDeck>
                        <Card onClick={() => this.navigate(RSTOOL_ROUTES.FARMRUN_TYPE_PARAM + FARM_CONSTS.farmTypes.ALL)}>
                            <Card.Body>
                                <Card.Title>ALL</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card onClick={() => this.navigate(RSTOOL_ROUTES.FARMRUN_TYPE_PARAM + FARM_CONSTS.farmTypes.HERB)}>
                            <Card.Body>
                                <Card.Title>HERB</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card onClick={() => this.navigate(RSTOOL_ROUTES.FARMRUN_TYPE_PARAM + FARM_CONSTS.farmTypes.TREE)}>
                            <Card.Body>
                                <Card.Title>TREE</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card onClick={() => this.navigate(RSTOOL_ROUTES.FARMRUN_TYPE_PARAM + FARM_CONSTS.farmTypes.FRUIT)}>
                            <Card.Body>
                                <Card.Title>FRUIT</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card onClick={() => this.navigate(RSTOOL_ROUTES.FARMRUN_TYPE_PARAM + FARM_CONSTS.farmTypes.BUSH)}>
                            <Card.Body>
                                <Card.Title>BUSH</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card onClick={() => this.navigate(RSTOOL_ROUTES.FARMRUN_TYPE_PARAM + FARM_CONSTS.farmTypes.CACTUS)}>
                            <Card.Body>
                                <Card.Title>CACTUS</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card onClick={() => this.navigate(RSTOOL_ROUTES.FARMRUN_TYPE_PARAM + FARM_CONSTS.farmTypes.MUSHROOM)}>
                            <Card.Body>
                                <Card.Title>MUSHROOM</Card.Title>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                </div>
            </Container>
        );
    }
}

FarmRuns.propTypes = {};

FarmRuns.defaultProps = {};

export default withRouter(FarmRuns);
