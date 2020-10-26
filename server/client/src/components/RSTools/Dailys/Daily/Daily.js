/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Accordion, Button, Card, Container } from 'react-bootstrap';
import { FaCheck, FaPlusSquare } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './Daily.scss';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';

class Daily extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dailys: [
                {
                    title: "Compost",
                    open: true,
                    steps: [
                        {
                            text: "go to x",
                            hasImg: false,
                            img: ""
                        },
                        {
                            text: "do x and y",
                            hasImg: false,
                            img: ""
                        }
                    ]
                },
                {
                    title: "Runes",
                    open: false,
                    steps: [
                        {
                            text: "go to x",
                            hasImg: false,
                            img: ""
                        },
                        {
                            text: "do x and y",
                            hasImg: false,
                            img: ""
                        }
                    ]
                },
                {
                    title: "Shop run",
                    open: false,
                    steps: [
                        {
                            text: "go to x",
                            hasImg: false,
                            img: ""
                        },
                        {
                            text: "do x and y",
                            hasImg: false,
                            img: ""
                        }
                    ]
                }
            ]
        }
    }

    componentDidMount() {

    }

    navigate = (route) => {
        this.props.history.push({pathname: route});
    }

    markComplete = (key) => e => {
        e.stopPropagation();
        console.log(key)
        console.log("mark as done")
    }

    render() {
        return (
            <Container>
                <div className="Daily">
                    <div className="button-header">
                        <Button variant="button-primary" className="add-daily" onClick={() => this.navigate(RSTOOL_ROUTES.DAILYSEARCH)}><FaPlusSquare /> Add Daily</Button>
                    </div>
                    {this.state.dailys.map((daily, i) => {
                        var cardKey = i.toString();
                        return (
                            <Accordion defaultActiveKey={daily.open ? cardKey : ""} key={i}>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey={cardKey}>
                                        <Button variant="button-primary" className="daily-complete" onClick={this.markComplete(i)}><FaCheck /></Button>
                                        {daily.title}
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={cardKey}>
                                    <Card.Body>
                                        {daily.steps.map((step, j) => {
                                            return (
                                                <div className="step-container" key={j}>
                                                    <Card.Text>
                                                        {j + 1}. {step.text}
                                                    </Card.Text>
                                                    {step.hasImg ? 
                                                    <Card.Img src={step.img} />
                                                    : null}
                                                </div>
                                            );
                                        })}
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        );
                    })}
                </div>
            </Container>
        );
    }
}

Daily.propTypes = {};

Daily.defaultProps = {};

export default withRouter(Daily);
