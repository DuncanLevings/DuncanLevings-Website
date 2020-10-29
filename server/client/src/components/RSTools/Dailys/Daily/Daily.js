/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Accordion, Button, Card, Container, Spinner } from 'react-bootstrap';
import { FaCheck, FaPlusSquare } from 'react-icons/fa';
import { getDaily, setDailyType } from 'store/actions/dailyActions';
import PropTypes from 'prop-types';
import './Daily.scss';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';

class Daily extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        // retrieve dailys of type
        this.props.getDaily(this.props.dailyType);
    }

    navigate = (route) => {
        this.props.setDailyType(this.props.dailyType);
        this.props.history.push(route);
    }

    markComplete = (key) => e => {
        e.stopPropagation();
        console.log(key)
        console.log("mark as done")
    }

    render() {
        const { dailys, isFetching } = this.props.dailyReducer;

        return (
            <Container>
                <div className="Daily">
                    <div className="button-header">
                        <Button variant="button-primary" className="add-daily" onClick={() => this.navigate(RSTOOL_ROUTES.DAILYSEARCH)}><FaPlusSquare /> Add Daily</Button>
                    </div>
                    {isFetching ? <Spinner animation="border" variant="light" /> : (
                        dailys.map((daily, i) => {
                            var cardKey = i.toString();
                            var dailyData = daily.dailyId;
                            return (
                                <Accordion defaultActiveKey={daily.collapsed ? "" : cardKey} key={i}>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey={cardKey}>
                                            <Button variant="button-primary" className="daily-complete" onClick={this.markComplete(i)}><FaCheck /></Button>
                                            {dailyData.title}
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey={cardKey}>
                                            <Card.Body>
                                                {dailyData.steps.map((step, j) => {
                                                    return (
                                                        <div className="step-container" key={j}>
                                                            <Card.Text>
                                                                {j + 1}. {step.step}
                                                            </Card.Text>
                                                            {step.url ?
                                                                <Card.Img src={step.url} />
                                                                : null}
                                                        </div>
                                                    );
                                                })}
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            );
                        })
                    )}
                </div>
            </Container>
        );
    }
}

Daily.propTypes = {
    setDailyType: PropTypes.func,
    getDaily: PropTypes.func,
    dailyReducer: PropTypes.object
};

const mapStateToProps = state => {
    return {
        dailyReducer: state.dailyReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ setDailyType, getDaily }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Daily));
