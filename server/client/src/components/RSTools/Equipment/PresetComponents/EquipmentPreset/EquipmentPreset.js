/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddItem from '../../Item/AddItem/AddItem.lazy';
import EditItem from '../../Item/EditItem/EditItem.lazy';
import { searchItems, getItemSingle, createItem, editItem, deleteItem, clearErrors } from 'store/actions/RSTools/equipmentActions';
import { Button, Col, Container, Form, FormControl, Image, InputGroup, ListGroup, Modal, OverlayTrigger, Row, Spinner, Tooltip } from 'react-bootstrap';
import { FaCheckSquare, FaEdit, FaTrash } from 'react-icons/fa';
import { EQUIPMENT_CONSTS } from 'consts/RSTools_Consts';
import _ from "lodash";
import PropTypes from 'prop-types';
import './EquipmentPreset.scss';

class EquipmentPreset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            slots: EQUIPMENT_CONSTS.slotPositions,
            selectedSlot: -1,
            addItemShow: false,
            editItemShow: false,
            showConfirm: false,
            hasEquipment: false
        }
    }

    componentDidMount() {
        if (this.props.editMode) {
            this.setState({
                hasEquipment: this.props.equipSlotData.length > 0 ? true : false,
                slots: this.props.equipSlotData.length > 0 ? this.props.equipSlotData : EQUIPMENT_CONSTS.slotPositions
            });

            if (this.props.equipSlotData.length > 0) this.setSelected(0);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentStep !== prevProps.currentStep) {
            if (this.props.currentStep === 1) {
                if (this.state.selectedSlot > -1) this.props.searchItems(this.state.selectedSlot);
                else this.props.searchItems(0);
            }
        }
    }

    setSelected = (slot) => {
        this.setState({ selectedSlot: slot });
        this.searchItems(slot);
    }

    searchItems = _.debounce((slot) => {
        this.props.searchItems(slot);
    }, 250)

    setSearch = e => {
        this.setState({ search: e.target.value });
    }

    generateSlots = () => {
        const { slots, selectedSlot } = this.state;
        return slots.map((slot, i) => {
            let selected = false;
            if (selectedSlot === i) {
                selected = true;
            }

            let slotSet = false;
            if (slot.name && slot.image) {
                slotSet = true;
            }

            return (
                <div key={i} className={
                    `slot left-${slot.left} top-${slot.top} 
                    ${slotSet ? 'slotSet' : ''}
                    ${selected ? 'selected' : ''}`
                } onClick={() => this.setSelected(i)}>
                    {this.populateSlotData(slot, i, slotSet)}
                </div>
            )
        });
    }

    populateSlotData = (slot, i, slotSet) => {
        if (slotSet) {
            return (
                <OverlayTrigger
                    key={i}
                    placement="top"
                    delay={{ show: 500, hide: 1000 }}
                    overlay={
                        <Tooltip id="tooltip-disabled">
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
                        </Tooltip>
                    }
                >
                    <Image className="slot-image" src={slot.image} fluid />
                </OverlayTrigger>
            );
        }

        return null;
    }

    equipSlot = (item) => {
        const { slots, selectedSlot } = this.state;
 
        let _slots = [...slots];
        let _slot = {
            ..._slots[selectedSlot],
            slot: selectedSlot,
            name: item.name,
            image: item.imageUrl,
            wiki: item.wiki ? item.wiki : null,
            augment: item.augment ? item.augment : null
        }
        _slots[selectedSlot] = _slot;

        this.setState({ slots: _slots });
        this.props.updateEquipData(_slots);
    }

    clearItemSlot = () => {
        const { slots, selectedSlot } = this.state;

        let _slots = [...slots];
        let _slot = slots[selectedSlot];

        delete _slot.slot;
        delete _slot.name;
        delete _slot.image;
        delete _slot.wiki;
        delete _slot.augment;

        _slots[selectedSlot] = _slot;

        this.setState({ slots: _slots });
        this.props.updateEquipData(_slots);
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
        this.props.deleteItem(this.state.selectedItemId, this.state.selectedSlot)
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

    enableEquipment = (bool) => {
        this.setState({ hasEquipment: bool });
        if (!bool) {
            this.props.updateEquipData([]);
            this.setState({
                search: '',
                slots: EQUIPMENT_CONSTS.slotPositions,
                selectedSlot: -1
            });
        }
    }

    nextWizardStep = () => {
        this.props.setCurrentStep(this.props.currentStep + 1);
        this.props.nextStep();
    }

    render() {
        const { addItemShow, editItemShow, selectedSlot, hasEquipment } = this.state;
        const { isSearching } = this.props.equipmentReducer;

        if (!hasEquipment) return (
            <div>
                <div className="step-button">
                    <Button variant="button-secondary" onClick={() => this.nextWizardStep()}>Skip</Button>
                </div>
                <div className="activate-component">
                    <Button variant="button-primary" onClick={() => this.enableEquipment(true)}>Add Equipment</Button>
                </div>
            </div>
        );

        const searchResults = this.generateSearchResult();

        return (
            <Container>
                <div className="EquipmentPreset">
                    <div className="step-button">
                        <Button variant="button-secondary" hidden={selectedSlot < 0} onClick={() => this.nextWizardStep()}>Next</Button>
                    </div>
                    <h5>Select a slot:</h5>
                    <div className="slot-container">
                        <div className="slotContainer">
                            <div className="slots">
                                {this.generateSlots()}
                            </div>
                        </div>
                    </div>
                    <div className="spacer-h-2" />
                    {this.confirmModal()}
                    {selectedSlot > -1 ?
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
                        selectedSlot={selectedSlot}
                        equipmentReducer={this.props.equipmentReducer}
                        createItem={data => this.props.createItem(data, selectedSlot)}
                        clearErrors={() => this.props.clearErrors()}
                        onHide={() => this.setAddItemShow(false)}
                    />
                    <EditItem
                        show={editItemShow}
                        equipmentReducer={this.props.equipmentReducer}
                        editItem={data => this.props.editItem(data, selectedSlot)}
                        clearErrors={() => this.props.clearErrors()}
                        onHide={() => this.setEditItemShow(false)}
                    />
                    <div className="step-button">
                        <Button variant="button-warning" onClick={() => this.enableEquipment(false)}>Remove Equipment</Button>
                    </div>
                </div>
            </Container>
        );
    }
}

EquipmentPreset.propTypes = {
    equipmentReducer: PropTypes.object,
    searchItems: PropTypes.func,
    getItemSingle: PropTypes.func,
    createItem: PropTypes.func,
    editItem: PropTypes.func,
    deleteItem: PropTypes.func,
    clearErrors: PropTypes.func,
    updateEquipData: PropTypes.func,
    setCurrentStep: PropTypes.func
};

const mapStateToProps = state => {
    return {
        equipmentReducer: state.equipmentReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ searchItems, getItemSingle, createItem, editItem, deleteItem, clearErrors }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentPreset);