/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { searchPvm } from 'store/actions/RSTools/pvmActions';
import { Button, Card, Container, Form, FormControl, InputGroup, Spinner } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './PvmEnemy.scss';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';

class PvmEnemy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            filter: 0
        }
    }

    componentDidMount() {
        this.props.searchPvm(this.props.pvmReducer.pvmType, this.state.filter);
    }

    navigate = (route) => {
        this.props.history.push(route);
    }

    setSearch = e => {
        this.setState({ search: e.target.value });
    }

    setFilter = e => {
        this.setState({ filter: e.target.value });
        this.props.searchPvm(this.props.pvmReducer.pvmType, e.target.value);
    }

    render() {
        const { pvmTypeName, isFetching } = this.props.pvmReducer;

        return (
            <Container>
                <div className="PvmEnemy">
                    <Form>
                        <Form.Group controlId="formSearch">
                            <InputGroup>
                                <FormControl
                                    placeholder="Search..."
                                    aria-label="search"
                                    aria-describedby="search"
                                    onChange={this.setSearch}
                                />
                                <InputGroup.Append>
                                    <Button variant="button-primary" onClick={() => this.navigate(RSTOOL_ROUTES.PVM_BUILDER)}>Add New {pvmTypeName} Enemy</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="formOptions">
                            <Form.Check
                                type="radio"
                                label="All Enemies"
                                name="formSearchOptions"
                                id="allResults"
                                value={0}
                                onChange={this.setFilter}
                                defaultChecked
                            />
                            <Form.Check
                                type="radio"
                                label="Public Enemies"
                                name="formSearchOptions"
                                id="publicOnly"
                                value={1}
                                onChange={this.setFilter}
                            />
                            <Form.Check
                                type="radio"
                                label="Your Enemies only"
                                name="formSearchOptions"
                                id="customOnly"
                                value={2}
                                onChange={this.setFilter}
                            />
                            <Form.Check
                                type="radio"
                                label="Enemies you have not selected"
                                name="formSearchOptions"
                                id="nonSelectedOnly"
                                value={3}
                                onChange={this.setFilter}
                            />
                        </Form.Group>
                    </Form>
                </div>
            </Container>
        );
    }
}

PvmEnemy.propTypes = {
    pvmReducer: PropTypes.object,
    searchPvm: PropTypes.func
};

const mapStateToProps = state => {
    return {
        pvmReducer: state.pvmReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ searchPvm }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PvmEnemy));