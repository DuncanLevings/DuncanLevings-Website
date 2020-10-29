/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
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
        const { dailyTypeName } = this.props.dailyReducer;

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
                                    <Button variant="button-primary" onClick={() => this.navigate(RSTOOL_ROUTES.ADDDAILY)}>Add Custom {dailyTypeName}</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="formOptions">
                            <Form.Check
                                type="radio"
                                label="All activities"
                                name="formSearchOptions"
                                id="allResults"
                                defaultChecked
                            />
                            <Form.Check
                                type="radio"
                                label="Public activities"
                                name="formSearchOptions"
                                id="publicOnly"
                            />
                            <Form.Check
                                type="radio"
                                label="Your custom activites"
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

SearchDaily.propTypes = {
    dailyReducer: PropTypes.object
};

const mapStateToProps = state => {
    return {
        dailyReducer: state.dailyReducer
    };
}

export default withRouter(connect(mapStateToProps, null)(SearchDaily));
