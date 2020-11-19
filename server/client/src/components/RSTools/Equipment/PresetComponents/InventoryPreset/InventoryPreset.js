/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchItems, getItemSingle, createItem, editItem, deleteItem, clearErrors } from 'store/actions/RSTools/equipmentActions';
import { Button, Col, Container, Form, FormControl, Image, InputGroup, ListGroup, Modal, OverlayTrigger, Row, Spinner, Tooltip } from 'react-bootstrap';
import { FaCheckSquare, FaEdit, FaTrash } from 'react-icons/fa';
import { EQUIPMENT_CONSTS } from 'consts/RSTools_Consts';
import AddItem from '../../Item/AddItem/AddItem.lazy';
import EditItem from '../../Item/EditItem/EditItem.lazy';
import PropTypes from 'prop-types';
import './InventoryPreset.scss';

class InventoryPreset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            inventorySlotData: EQUIPMENT_CONSTS.inventorySlotData,
            selectedSlots: [],
            addItemShow: false,
            editItemShow: false,
            showConfirm: false,
            hasInventory: false
        }
    }

    componentDidMount() {
        if (this.props.editMode) {
            this.setState({
                hasInventory: this.props.inventorySlotData.length > 0 ? true : false,
                inventorySlotData: this.props.inventorySlotData.length > 0 ? this.props.inventorySlotData : EQUIPMENT_CONSTS.inventorySlotData
            });

            if (this.props.inventorySlotData.length > 0) this.setSelected('slot1');
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentStep !== prevProps.currentStep) {
            if (this.props.currentStep === 2) {
                this.props.searchItems(13);
            }
        }
    }

    enableInventory = (bool) => {
        this.setState({ hasInventory: bool });
        if (!bool) {
            this.props.updateInventoryData([]);
            this.setState({
                search: '',
                inventorySlotData: EQUIPMENT_CONSTS.inventorySlotData,
                selectedSlots: []
            });
        }
    }

    nextWizardStep = () => {
        this.props.setCurrentStep(this.props.currentStep + 1);
        this.props.nextStep();
    }

    previousStep = () => {
        this.props.setCurrentStep(this.props.currentStep - 1);
        this.props.previousStep();
    }

    setSelected = (slot, event) => {
        const { selectedSlots, inventorySlotData } = this.state;

        if (event && event.ctrlKey) {
            this.setState({ selectedSlots: [...selectedSlots, slot] });
        } else if (event && event.shiftKey) {
            let startIndex = 0;
            if (selectedSlots.length > 0) startIndex = inventorySlotData.findIndex(s => s.id === selectedSlots[0]);
            
            const endIndex = inventorySlotData.findIndex(s => s.id === slot);
            const slots = this.setSelectedMultiple(startIndex, endIndex);
            this.setState({ selectedSlots: slots });
        } else {
            this.setState({ selectedSlots: [slot] });
        }
    }

    setSelectedMultiple = (start, end) => {
        const { inventorySlotData } = this.state;
        let _start = start;
        let _end = end;

        // reverse order
        if (start > end) {
            let temp_end = end;
            _start = temp_end;
            _end = start;
        }

        const slots = [];
        for (let i = _start; i <= _end; i++) {
            slots.push(inventorySlotData[i].id)
        }
        return slots;
    }

    swapBoxes = (fromSlot, toSlot) => {
        let slots = this.state.inventorySlotData.slice();
        let fromIndex = -1;
        let toIndex = -1;

        for (let i = 0; i < slots.length; i++) {
            if (slots[i].id === fromSlot.id) {
                fromIndex = i;
            }
            if (slots[i].id === toSlot.id) {
                toIndex = i;
            }
        }

        if (fromIndex !== -1 && toIndex !== -1) {
            let { fromId, ...fromRest } = slots[fromIndex];
            let { toId, ...toRest } = slots[toIndex];
            slots[fromIndex] = { id: fromSlot.id, ...toRest };
            slots[toIndex] = { id: toSlot.id, ...fromRest };

            this.setState({ inventorySlotData: slots });
            this.props.updateInventoryData(slots);
        }
    };

    handleDragStart = id => event => {
        let fromSlot = JSON.stringify({ id: id });
        event.dataTransfer.setData("dragContent", fromSlot);
    };

    handleDragOver = () => event => {
        event.preventDefault(); // Necessary. Allows us to drop.
        return false;
    };

    handleDrop = id => event => {
        event.preventDefault();

        if (!event.dataTransfer.getData("dragContent")) return false;
        let fromSlot = JSON.parse(event.dataTransfer.getData("dragContent"));
        let toSlot = { id: id };

        this.swapBoxes(fromSlot, toSlot);
        return false;
    };

    createList = () => {
        const { selectedSlots, inventorySlotData } = this.state;

        return inventorySlotData.map((slot, index) =>
            slot.name && slot.image ?
                <OverlayTrigger
                    key={index}
                    placement="top"
                    delay={{ show: 750, hide: 500 }}
                    overlay={<Tooltip id="tooltip-disabled">
                        <span className="item-slot-name">{slot.name}</span>
                        {slot.wiki ? <a target="_blank" href={slot.wiki} rel="noopener noreferrer"> Wiki</a> : null}
                        <br />
                        {slot.augment && slot.augment.isAugmented ?
                            <div className="item-slot-perks">
                                {slot.augment.gizmo1}
                                <br />
                                {slot.augment.gizmo2}
                            </div>
                            : null}
                    </Tooltip>}
                >
                    <div
                        className={`inventory-slot ${selectedSlots.includes(slot.id) ? 'selected' : ''}`}
                        onClick={(e) => this.setSelected(slot.id, e)}
                        draggable="true"
                        onDragStart={this.handleDragStart(slot.id)}
                        onDragOver={this.handleDragOver()}
                        onDrop={this.handleDrop(slot.id)}
                    >
                        <Image className="inventory-img" src={slot.image} />
                    </div>
                </OverlayTrigger>
                :
                <div
                    key={index}
                    className={`inventory-slot ${selectedSlots.includes(slot.id) ? 'selected' : ''}`}
                    draggable="false"
                    onClick={(e) => this.setSelected(slot.id, e)}
                    onDragOver={this.handleDragOver()}
                    onDrop={this.handleDrop(slot.id)}
                />
        );
    }

    setSearch = e => {
        this.setState({ search: e.target.value });
    }

    equipSlot = (item) => {
        const { selectedSlots, inventorySlotData } = this.state;

        let _slots = [...inventorySlotData];
        for (const slot of selectedSlots) {
            let _slot = {
                ..._slots.find(row => row.id === slot),
                name: item.name,
                image: item.imageUrl,
                wiki: item.wiki ? item.wiki : null,
                augment: item.augment ? item.augment : null
            }
            _slots[_slots.findIndex(row => row.id === slot)] = _slot;
        }

        this.setState({ inventorySlotData: _slots });
        this.props.updateInventoryData(_slots);
    }

    clearItemSlot = () => {
        const { selectedSlots, inventorySlotData } = this.state;

        let _slots = [...inventorySlotData];
        for (const slot of selectedSlots) {
            let _slot = _slots[_slots.findIndex(row => row.id === slot)];

            delete _slot.name;
            delete _slot.image;
            delete _slot.wiki;
            delete _slot.augment;

            _slots[_slots.findIndex(row => row.id === slot)] = _slot;
        }

        this.setState({ inventorySlotData: _slots });
        this.props.updateInventoryData(_slots);
    }

    generateSearchResult = () => {
        const { search } = this.state;
        const { searchItems } = this.props.equipmentReducer;

        return searchItems
            .filter(item => search === '' || item.name.toLowerCase().includes(search.toLowerCase()))
            .map((item, i) =>
                <ListGroup.Item key={i}>
                    <Row>
                        <Col xs={2}><FaCheckSquare className="action-icon add" onClick={() => this.equipSlot(item)} /></Col>
                        <Col xs={1}><Image src={item.imageUrl} /></Col>
                        <Col xs={6}>{item.name}</Col>
                        <Col><span className="actions">
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
                        </span></Col>
                    </Row>
                </ListGroup.Item>
            );
    }

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
        this.props.deleteItem(this.state.selectedItemId, 13)
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
        const { addItemShow, editItemShow, hasInventory, selectedSlots } = this.state;
        const { isSearching } = this.props.equipmentReducer;

        if (!hasInventory) return (
            <div>
                <div className="step-button">
                    <Button variant="button-secondary" className="previous-button" onClick={() => this.previousStep()}>Previous</Button>
                    <Button variant="button-secondary" onClick={() => this.nextWizardStep()}>Skip</Button>
                </div>
                <div className="activate-component">
                    <Button variant="button-primary" onClick={() => this.enableInventory(true)}>Add Inventory</Button>
                </div>
            </div>
        );

        const searchResults = this.generateSearchResult();
        const inventorySlots = this.createList();

        return (
            <Container>
                <div className="InventoryPreset">
                    <div className="step-button">
                        <Button variant="button-secondary" className="previous-button" onClick={() => this.previousStep()}>Previous</Button>
                        <Button variant="button-secondary" hidden={selectedSlots.length === 0} onClick={() => this.nextWizardStep()}>Next</Button>
                    </div>
                    <h5>Select a slot:</h5>
                    <div className="slot-hint">Ctrl/Shift click for multiple</div>
                    <div className="spacer-h-2" />
                    <div className="inventory-container">
                        <div className="inventoryContainer">
                            <div className="inventory-slots-container">
                                {inventorySlots}
                            </div>
                        </div>
                    </div>
                    <div className="spacer-h-2" />
                    {this.confirmModal()}
                    {selectedSlots.length > 0 ?
                        <>
                            <div className="clear-slot">
                                <Button variant="button-secondary" onClick={() => this.clearItemSlot()}>Clear selected slot</Button>
                            </div>
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
                            {isSearching ?
                                <Spinner animation="border" variant="light" /> :
                                searchResults.length > 0 ?
                                    <ListGroup variant="flush" className="scrollable-list">
                                        {searchResults}
                                    </ListGroup> :
                                    <p>No items found...</p>
                            }
                        </>
                        : null}
                    <AddItem
                        show={addItemShow}
                        selectedSlot={13}
                        equipmentReducer={this.props.equipmentReducer}
                        createItem={data => this.props.createItem(data, 13)}
                        clearErrors={() => this.props.clearErrors()}
                        onHide={() => this.setAddItemShow(false)}
                    />
                    <EditItem
                        show={editItemShow}
                        equipmentReducer={this.props.equipmentReducer}
                        editItem={data => this.props.editItem(data, 13)}
                        clearErrors={() => this.props.clearErrors()}
                        onHide={() => this.setEditItemShow(false)}
                    />
                    <div className="step-button">
                        <Button variant="button-warning" onClick={() => this.enableInventory(false)}>Remove Inventory</Button>
                    </div>
                </div>
            </Container>
        );
    }
}

InventoryPreset.propTypes = {
    equipmentReducer: PropTypes.object,
    searchItems: PropTypes.func,
    getItemSingle: PropTypes.func,
    createItem: PropTypes.func,
    editItem: PropTypes.func,
    deleteItem: PropTypes.func,
    clearErrors: PropTypes.func,
    updateInventoryData: PropTypes.func,
    setCurrentStep: PropTypes.func
};

const mapStateToProps = state => {
    return {
        equipmentReducer: state.equipmentReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ searchItems, getItemSingle, createItem, editItem, deleteItem, clearErrors }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InventoryPreset);