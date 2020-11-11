/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Collapse, Container, Form, FormControl, Image, InputGroup, ListGroup, Modal, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { searchItems, getItemSingle, createItem, editItem, deleteItem, clearErrors } from 'store/actions/RSTools/equipmentActions';
import { EQUIPMENT_CONSTS } from 'consts/RSTools_Consts';
import SlotFilter from '../../SlotFilter/SlotFilter.lazy';
import AddItem from '../AddItem/AddItem.lazy';
import EditItem from '../EditItem/EditItem.lazy';
import _ from "lodash";
import PropTypes from 'prop-types';
import './Items.scss';

class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            filterSlots: [],
            filterOpen: false,
            addItemShow: false,
            editItemShow: false,
            showConfirm: false
        }
    }

    componentDidMount() {
        this.props.searchItems(this.state.filterSlots);
    }

    setFilterOpen = bool => {
        this.setState({ filterOpen: bool });
    }

    setSearch = e => {
        this.setState({ search: e.target.value });
    }

    filterSlots = (slots) => {
        this.setState({ filterSlots: slots }, () => {
            this.search(slots)
        });
    }

    search = _.debounce((slots) => {
        this.props.searchItems(slots);
    }, 500)

    setAddItemShow = (bool) => {
        this.setState({ addItemShow: bool });
    }

    setEditItemShow = (bool, itemId = null) => {
        this.setState({ editItemShow: bool });
        if (itemId) this.props.getItemSingle(itemId);
    }

    setShowConfirm = (bool, itemId = null) => {
        this.setState({
            showConfirm: bool,
            selectedItemId: itemId ? itemId : this.state.selectedItemId
        });
    }

    deleteItem = () => {
        this.props.deleteItem(this.state.selectedItemId, this.state.filterSlots)
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

    render() {
        const { search, filterOpen, addItemShow, editItemShow, filterSlots } = this.state;
        const { searchItems, isSearching } = this.props.equipmentReducer;

        const searchResults = searchItems
            .filter(item => search === '' || item.name.includes(search))
            .map((item, i) =>
                <ListGroup.Item key={i}>
                    <Image src={item.imageUrl} /> {item.name} - {EQUIPMENT_CONSTS.slotTypes[item.slot]}
                    <span className="actions">
                        {item.isOwner ?
                            <>
                                <FaEdit className="action-icon edit" onClick={() => this.setEditItemShow(true, item._id)} />
                                <FaTrash className="action-icon delete" onClick={() => this.setShowConfirm(true, item._id)} />
                            </>
                            :
                            <>
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Can only edit items YOU made.</Tooltip>}>
                                    <span className="d-inline-block disabled-action">
                                        <FaEdit disabled style={{ pointerEvents: 'none' }} />
                                    </span>
                                </OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Can only delete items YOU made.</Tooltip>}>
                                    <span className="d-inline-block disabled-action">
                                        <FaTrash disabled style={{ pointerEvents: 'none' }} />
                                    </span>
                                </OverlayTrigger>
                            </>
                        }
                    </span>
                </ListGroup.Item>
            );

        return (
            <Container>
                <div className="Items">
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
                                    <Button variant="button-primary" onClick={() => this.setAddItemShow(true)}>Add Item</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                    <div className="filter">
                        <Button
                            onClick={() => this.setFilterOpen(!filterOpen)}
                            variant="button-secondary"
                            aria-controls="collapse-div"
                            aria-expanded={filterOpen}
                        >
                            {filterOpen ? "Hide Filter" : "Show Filter"}
                        </Button>
                        <Collapse in={filterOpen}>
                            <div id="collapse-div">
                                <div className="filter-container">
                                    <SlotFilter filterSelected={slots => this.filterSlots(slots)} />
                                </div>
                            </div>
                        </Collapse>
                    </div>
                    <div className="spacer-h-3" />
                    {isSearching ?
                        <Spinner animation="border" variant="light" /> :
                        searchResults.length > 0 ?
                            <ListGroup variant="flush" className="scrollable-list">
                                {searchResults}
                            </ListGroup> :
                            <p>No items found...</p>
                    }
                    <AddItem
                        show={addItemShow}
                        equipmentReducer={this.props.equipmentReducer}
                        createItem={data => this.props.createItem(data, filterSlots)}
                        clearErrors={() => this.props.clearErrors()}
                        onHide={() => this.setAddItemShow(false)}
                    />
                    <EditItem
                        show={editItemShow}
                        equipmentReducer={this.props.equipmentReducer}
                        editItem={data => this.props.editItem(data, filterSlots)}
                        clearErrors={() => this.props.clearErrors()}
                        onHide={() => this.setEditItemShow(false)}
                    />
                </div>
            </Container>
        );
    }
}

Items.propTypes = {
    equipmentReducer: PropTypes.object,
    searchItems: PropTypes.func,
    getItemSingle: PropTypes.func,
    createItem: PropTypes.func,
    editItem: PropTypes.func,
    deleteItem: PropTypes.func,
    clearErrors: PropTypes.func
};

const mapStateToProps = state => {
    return {
        equipmentReducer: state.equipmentReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ searchItems, getItemSingle, createItem, editItem, deleteItem, clearErrors }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Items);