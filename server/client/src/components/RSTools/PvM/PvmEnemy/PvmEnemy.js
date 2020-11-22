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
import { Button, Col, Container, Form, FormControl, Image, InputGroup, ListGroup, OverlayTrigger, Row, Spinner, Tooltip } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import PropTypes from 'prop-types';
import './PvmEnemy.scss';

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

    navigate = (route, bool = false, pvmId = null) => {
        this.props.history.push({
            pathname: route,
            state: {
                newTask: bool,
                pvmId: pvmId
            }
        });
    }

    setSearch = e => {
        this.setState({ search: e.target.value });
    }

    setFilter = e => {
        this.setState({ filter: e.target.value });
        this.props.searchPvm(this.props.pvmReducer.pvmType, e.target.value);
    }

    getData = () => {
        const { search } = this.state;
        const { searchPvm } = this.props.pvmReducer;

        return searchPvm
            .filter(pvm => search === '' || pvm.name.toLowerCase().includes(search.toLowerCase()))
            .map((pvm, i) =>
                <ListGroup.Item key={i}>
                    <Row>
                        <Col xs={1}><FaPlus size="1.25em" className="action-icon add" onClick={() => this.navigate(RSTOOL_ROUTES.PVM_TASK_BUILDER, true, pvm._id)} /></Col>
                        <Col xs={1}><Image src={pvm.thumbnailURL} /></Col>
                        <Col xs={6}>{pvm.name}</Col>
                        <Col><span className="actions">
                            {pvm.isOwner ?
                                <>
                                    <FaEdit className="action-icon edit" />
                                    <FaTrash className="action-icon delete" />
                                </>
                                :
                                <>
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Can only edit pvm enemies YOU made.</Tooltip>}>
                                        <span className="d-inline-block disabled-action">
                                            <FaEdit disabled style={{ pointerEvents: 'none' }} />
                                        </span>
                                    </OverlayTrigger>
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Can only delete pvm enemies YOU made.</Tooltip>}>
                                        <span className="d-inline-block disabled-action">
                                            <FaTrash disabled style={{ pointerEvents: 'none' }} />
                                        </span>
                                    </OverlayTrigger>
                                </>
                            }
                        </span></Col>
                    </Row>
                </ListGroup.Item>
            );
    }

    render() {
        const { pvmTypeName, isSearching } = this.props.pvmReducer;

        const searchResults = this.getData();

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
                    <div className="spacer-h-3" />
                    {isSearching ?
                        <Spinner animation="border" variant="light" /> :
                        searchResults.length > 0 ?
                            <ListGroup variant="flush" className="scrollable-list">
                                {searchResults}
                            </ListGroup> :
                            <p>No pvm enemies found...</p>
                    }
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