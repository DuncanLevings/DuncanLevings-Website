/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getItems, setAcquired, createItem, deleteItem, clearErrors } from 'store/actions/RSTools/bronzeManActions';
import { Button, Col, Container, Form, FormControl, InputGroup, ListGroup, Modal, Row, Spinner } from 'react-bootstrap';
import { FaCheck, FaTrash, FaTimes } from 'react-icons/fa';
import _ from "lodash";
import PropTypes from 'prop-types';
import './BronzeManMode.scss';
import AddBronzeManItem from '../AddBronzeManItem/AddBronzeManItem';

class BronzeManMode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            acquiredIds: [],
            deletedIds: [],
            search: '',
            addItemShow: false,
            showConfirm: false
        }
    }

    componentDidMount() {
        this.props.getItems("");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.bronzeManReducer.items !== this.props.bronzeManReducer.items) {
            this.setAcquiredItems();
        }
    }

    setSearch = _.debounce((e) => {
        this.setState({ search: e });
        this.props.getItems(e);
    }, 500)

    setAddItemShow = (bool) => {
        this.setState({ addItemShow: bool });
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
        const { items } = this.props.bronzeManReducer;

        this.setState({ acquiredIds: [], deletedIds: [] });
    
        if (!Array.isArray(items)) return;

        items.forEach(item => {
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

    generateSearchResults = () => {
        const { search } = this.state;
        const { items } = this.props.bronzeManReducer;

        if (search === '') return [];
        if (!Array.isArray(items)) return [];

        return items
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
        const { addItemShow } = this.state;
        const { isFetching } = this.props.bronzeManReducer;

        const searchResults = this.generateSearchResults();

        return (
            <Container>
                <div className="BronzeManMode">
                    {this.confirmModal()}
                    <Form>
                        <Form.Group controlId="formSearch">
                            <InputGroup>
                                <FormControl
                                    placeholder="Search..."
                                    aria-label="search"
                                    aria-describedby="search"
                                    onChange={(e) => this.setSearch(e.target.value)}
                                />
                                <InputGroup.Append>
                                    <Button variant="button-primary" onClick={() => this.setAddItemShow(true)}>Add Item</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                    <div className="spacer-h-3" />
                    {isFetching ?
                        <Spinner animation="border" variant="light" /> :
                        searchResults.length > 0 ?
                            <ListGroup variant="flush" className="scrollable-list">
                                {searchResults}
                            </ListGroup> :
                            <p>No items found...</p>
                    }
                    <AddBronzeManItem
                        show={addItemShow}
                        bronzeManReducer={this.props.bronzeManReducer}
                        createItem={data => this.props.createItem(data)}
                        clearErrors={() => this.props.clearErrors()}
                        onHide={() => this.setAddItemShow(false)}
                    />
                </div>
            </Container>
        );
    }
}

BronzeManMode.propTypes = {
    bronzeManReducer: PropTypes.object,
    getItems: PropTypes.func,
    setAcquired: PropTypes.func,
    createItem: PropTypes.func,
    deleteItem: PropTypes.func,
    clearErrors: PropTypes.func
};

const mapStateToProps = state => {
    return {
        bronzeManReducer: state.bronzeManReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getItems, setAcquired, createItem, deleteItem, clearErrors }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BronzeManMode);
