/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Form, FormControl, InputGroup, ListGroup } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import PropTypes from 'prop-types';
import './SearchDaily.scss';

class SearchDaily extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    title: "daily"
                },
                {
                    title: "weekly"
                }
            ]
        }
    }

    componentDidMount() {

    }

    navigate = (route) => {
        this.props.history.push(route);
    }

    render() {
        return (
            <Container>
                <div className="SearchDaily">
                    <Form>
                        <Form.Group controlId="formSearch">
                            <InputGroup>
                                <FormControl
                                    placeholder="Search..."
                                    aria-label="search"
                                    aria-describedby="search"
                                />
                                <InputGroup.Append>
                                    <Button variant="button-primary" onClick={() => this.navigate(RSTOOL_ROUTES.ADDDAILY)}>Add Custom Daily</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="formOptions">
                            <Form.Check
                                type="radio"
                                label="All results"
                                name="formSearchOptions"
                                id="allResults"
                                defaultChecked
                            />
                            <Form.Check
                                type="radio"
                                label="Custom only"
                                name="formSearchOptions"
                                id="customOnly"
                            />
                        </Form.Group>
                    </Form>
                    <ListGroup variant="flush">
                        {this.state.data.map((data, i) => {
                            return (
                                <ListGroup.Item key={i}>{data.title} <span className="actions"><FaPlus className="action-icon add" /></span></ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </div>
            </Container>
        );
    }
}

SearchDaily.propTypes = {};

SearchDaily.defaultProps = {};

export default withRouter(SearchDaily);
