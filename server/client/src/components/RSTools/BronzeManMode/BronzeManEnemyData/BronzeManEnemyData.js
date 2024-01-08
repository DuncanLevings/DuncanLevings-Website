/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEnemyData, setAcquired, deleteItem } from 'store/actions/RSTools/bronzeManActions';
import { Button, Col, Container, Form, FormControl, InputGroup, ListGroup, Modal, Row, Spinner } from 'react-bootstrap';
import { FaCheck, FaTrash, FaTimes } from 'react-icons/fa';
import _ from "lodash";
import PropTypes from 'prop-types';
import './BronzeManEnemyData.scss';

class BronzeManEnemyData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            acquiredIds: [],
            deletedIds: [],
            showConfirm: false
        }
    }

    componentDidMount() {
        this.props.getEnemyData(this.props.location.state.enemyName);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.bronzeManReducer.enemyData.items !== this.props.bronzeManReducer.enemyData.items) {
            this.setAcquiredItems();
        }
    }

    setShowConfirm = (bool, itemId = null) => {
        this.setState({
            showConfirm: bool,
            selectedItemId: itemId ? itemId : this.state.selectedItemId
        });
    }

    deleteItem = () => {
        this.markDeleted(this.state.selectedItemId)
        this.props.deleteItem(this.state.selectedItemId);
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
                    <p>Are you sure you wish to delete this item?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="button-secondary" onClick={() => this.setShowConfirm(false)}>Cancel</Button>
                    <Button variant="button-warning" onClick={() => this.deleteItem()}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    setAcquiredItems = () => {
        const { enemyData } = this.props.bronzeManReducer;

        this.setState({ acquiredIds: [], deletedIds: [] });
    
        if (!Array.isArray(enemyData.items)) return;

        enemyData.items.forEach(item => {
            if (item.acquired) {
                this.markAcquired(item._id);
            }
        });
    }

    setAcquired = (item) => {
        this.props.setAcquired(item._id);
        if (this.checkAquired(item._id)) {
            this.setState(prevState => ({
                acquiredIds: prevState.acquiredIds.filter(i => i !== item._id)
            }));
        } else {
            this.markAcquired(item._id);
        }
    }

    markAcquired = (itemId) => {
        this.setState(prevState => ({
            acquiredIds: [...prevState.acquiredIds, itemId]
        }));
    }

    markDeleted = (itemId) => {
        this.setState(prevState => ({
            deletedIds: [...prevState.deletedIds, itemId]
        }));
    }

    checkAquired = (itemId) => {
        if (this.state.acquiredIds.includes(itemId)) return true;
        return false;
    }

    checkDeleted = (itemId) => {
        if (this.state.deletedIds.includes(itemId)) return true;
        return false;
    }

    generateResults = () => {
        const { enemyData } = this.props.bronzeManReducer;

        if (!enemyData.items) return [];

        return enemyData.items
            .map((item, i) =>
                <ListGroup.Item key={i} hidden={this.checkDeleted(item._id)} className={this.checkAquired(item._id) ? "acquired" : "not-acquired"}>
                    <Row>
                        <Col xs={1}>
                            <span className="actions">
                            {this.checkAquired(item._id) ?
                                <FaTimes className="action-icon delete" size="1.5em" onClick={() => this.setAcquired(item)} />
                                :
                                <FaCheck className="action-icon view" size="1.5em" onClick={() => this.setAcquired(item)} />
                            }
                            </span>
                        </Col>
                        <Col>{item.name}</Col>
                        <Col>
                            <span className="actions">
                                <FaTrash className="action-icon delete" onClick={() => this.setShowConfirm(true, item._id)} />
                            </span>
                        </Col>
                    </Row>
                </ListGroup.Item>
            );
    }

    render() {
        const { isFetching, enemyData } = this.props.bronzeManReducer;

        const data = this.generateResults();

        return (
            <Container>
                <div className="BronzeManEnemyData">
                    {this.confirmModal()}
                    <h3>{enemyData.name}</h3>
                    <div className="spacer-h-3" />
                    {isFetching ?
                        <Spinner animation="border" variant="light" /> :
                        data.length > 0 ?
                            <ListGroup variant="flush" className="scrollable-list">
                                {data}
                            </ListGroup> :
                            <p>No enemy data found...</p>
                    }
                </div>
            </Container>
        );
    }
}

BronzeManEnemyData.propTypes = {
    bronzeManReducer: PropTypes.object,
    getEnemyData: PropTypes.func,
    setAcquired: PropTypes.func,
    deleteItem: PropTypes.func,
    clearErrors: PropTypes.func
};

const mapStateToProps = state => {
    return {
        bronzeManReducer: state.bronzeManReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getEnemyData, setAcquired, deleteItem }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BronzeManEnemyData));