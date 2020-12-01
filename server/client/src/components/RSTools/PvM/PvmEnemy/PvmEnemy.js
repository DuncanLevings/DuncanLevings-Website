/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { setPvmType, searchPvm, deletePvm } from 'store/actions/RSTools/pvmActions';
import { Button, Col, Container, Form, FormControl, Image, InputGroup, ListGroup, Modal, OverlayTrigger, Row, Spinner, Tooltip } from 'react-bootstrap';
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
        const type = parseInt(localStorage.getItem("pvmType"));
        this.props.setPvmType(type);
        this.props.searchPvm(type, this.state.filter);
    }

    navigate = (route, state = null) => {
        this.props.history.push({
            pathname: route,
            state: state
        });
    }

    setSearch = e => {
        this.setState({ search: e.target.value });
    }

    setShowConfirm = (bool, pvmId = null) => {
        this.setState({
            showConfirm: bool,
            selectedPvmId: pvmId ? pvmId : this.state.selectedPvmId
        });
    }

    deletePvm = () => {
        this.props.deletePvm(this.state.selectedPvmId, this.state.filter);
        this.setState({ showConfirm: false });
    }

    confirmModal = () => {
        const { showConfirm } = this.state;

        return (
            <Modal
                show={showConfirm}
                onHide={() => this.setShowConfirm(false)}
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="confirm-modal text"
                centered
            >
                <Modal.Header>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you wish to delete this enemy?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="button-secondary" onClick={() => this.setShowConfirm(false)}>Cancel</Button>
                    <Button variant="button-warning" onClick={() => this.deletePvm()}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
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
                        <Col xs={1}><FaPlus size="1.25em" className="action-icon add" onClick={() => this.navigate(RSTOOL_ROUTES.PVM_TASK_BUILDER,
                            {
                                newTask: true,
                                pvmId: pvm._id
                            })} /></Col>
                        <Col xs={1}><Image className="thumbnail" src={pvm.thumbnailURL} /></Col>
                        <Col xs={6}>{pvm.name}</Col>
                        <Col><span className="actions">
                            {pvm.isOwner ?
                                <>
                                    <FaEdit className="action-icon edit" onClick={() => this.navigate(RSTOOL_ROUTES.PVM_BUILDER,
                                        {
                                            from: this.props.location.pathname,
                                            pvmId: pvm._id,
                                            editMode: true
                                        })}/>
                                    <FaTrash className="action-icon delete" onClick={() => this.setShowConfirm(true, pvm._id)}/>
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
        const { pvmTypeName, isSearching, isSaving } = this.props.pvmReducer;

        const searchResults = this.getData();

        return (
            <Container>
                <div className="PvmEnemy">
                    {this.confirmModal()}
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
                                    <Button variant="button-primary" onClick={() => this.navigate(RSTOOL_ROUTES.PVM_BUILDER,
                                        {
                                            from: this.props.location.pathname
                                        })}>Add New {pvmTypeName} Enemy</Button>
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
                    {isSearching || isSaving ?
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
    setPvmType: PropTypes.func,
    searchPvm: PropTypes.func,
    deletePvm: PropTypes.func
};

const mapStateToProps = state => {
    return {
        pvmReducer: state.pvmReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ setPvmType, searchPvm, deletePvm }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PvmEnemy));