/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAbilityBarSingle, searchAbilityBars, createAbilityBar, editAbilityBar, deleteAbilityBar, clearAbilityBarObj } from 'store/actions/RSTools/equipmentActions';
import { Button, Col, Container, Form, FormControl, Image, InputGroup, ListGroup, Modal, OverlayTrigger, Row, Spinner, Tooltip } from 'react-bootstrap';
import { FaCheckSquare, FaEdit, FaTrash } from 'react-icons/fa';
import AddAbilityBar from '../../Ability/AddAbilityBar/AddAbilityBar.lazy';
import EditAbilityBar from '../../Ability/EditAbilityBar/EditAbilityBar.lazy';
import PropTypes from 'prop-types';
import './AbilityBarPreset.scss';

class AbilityBarPreset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            abilityBar: null,
            barSlots: [],
            filterStyle: 0,
            addAbilityBarShow: false,
            editAbilityBarShow: false,
            showConfirm: false,
            hasAbilityBar: false,
            abilityBarSet: false,
            originalBarEdited: false,
            editFromPreset: true
        }
    }

    componentDidMount() {
        if (this.props.editMode) {
            this.setState({
                hasAbilityBar: this.props.abilityBarData.length > 0 ? true : false,
                abilityBarSet: this.props.abilityBarData.length > 0 ? true : false,
                abilityBar: this.props.presetAbilityBar ? this.props.presetAbilityBar : null,
                barSlots: this.props.abilityBarData.length > 0 ? this.props.abilityBarData : []
            });
        }

        this.props.searchAbilityBars(this.state.filterStyle);
    }

    setSearch = e => {
        this.setState({ search: e.target.value });
    }

    setAddAbilityBarShow = (bool) => {
        this.setState({ addAbilityBarShow: bool });
    }

    setFilter = e => {
        this.setState({ filterStyle: e.target.value });
        this.props.searchAbilityBars(e.target.value);
    }

    setShowConfirm = (bool, abilityBarId = null) => {
        this.setState({
            showConfirm: bool,
            selectedAbilityBarId: abilityBarId ? abilityBarId : this.state.selectedAbilityBarId
        });
    }

    deleteAbilityBar = () => {
        this.props.deleteAbilityBar(this.state.selectedAbilityBarId, this.state.filterStyle)
        this.setState({ showConfirm: false });
    }

    setEditAbilityBarShow = (bool, abilityBarId = null) => {
        this.setState({
            editAbilityBarShow: bool,
            editFromPreset: false
        });
        if (abilityBarId) this.props.getAbilityBarSingle(abilityBarId);
    }

    editBar = () => {
        const { abilityBar } = this.state;

        this.setState({
            editAbilityBarShow: true,
            editFromPreset: true
        });
        if (abilityBar) this.props.getAbilityBarSingle(abilityBar._id);
        else this.props.clearAbilityBarObj();
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
                    <p>Are you sure you wish to delete this ability bar?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="button-secondary" onClick={() => this.setShowConfirm(false)}>Cancel</Button>
                    <Button variant="button-warning" onClick={() => this.deleteAbilityBar()}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    enableAbilityBar = (bool) => {
        this.setState({ hasAbilityBar: bool });
        if (!bool) {
            this.props.updateAbilityBarData([], null);
            this.setState({
                search: '',
                abilityBar: null,
                barSlots: [],
                hasAbilityBar: false,
                abilityBarSet: false,
                originalBarEdited: false
            });
        }
    }

    setAbilityBar = (bar) => {
        this.setState({
            abilityBar: bar,
            barSlots: bar.abilityBar,
            abilityBarSet: true
        });
        this.props.updateAbilityBarData(bar.abilityBar, bar);
    }

    setBarSlots = (slots, originalChanged = false) => {
        const { abilityBar } = this.state;

        this.setState({
            barSlots: slots,
            originalBarEdited: originalChanged // to determine if user edited the bar without saving preset
        });

        if (originalChanged) {
            this.setState({ abilityBar: null });
            this.props.clearAbilityBarObj(); // clear props object if original was edited
            this.props.updateAbilityBarData(slots, null, originalChanged);
        } else {
            this.props.updateAbilityBarData(slots, abilityBar, originalChanged);
        }
    }

    clearAbilityBar = () => {
        this.setState({
            abilityBar: null,
            barSlots: [],
            abilityBarSet: false,
            originalBarEdited: false
        });
        this.props.updateAbilityBarData([], null);
    }

    nextWizardStep = () => {
        this.props.setCurrentStep(this.props.currentStep + 1);
        this.props.nextStep();
    }

    previousStep = () => {
        this.props.setCurrentStep(this.props.currentStep - 1);
        this.props.previousStep();
    }

    searchResults = () => {
        const { search } = this.state;
        const { searchAbilityBars } = this.props.equipmentReducer;

        return searchAbilityBars
            .filter(bar => search === '' || bar.name.toLowerCase().includes(search.toLowerCase()))
            .map((bar, i) =>
                <ListGroup.Item key={i}>
                    <Row>
                        <Col xs={1}><FaCheckSquare className="action-icon add" onClick={() => this.setAbilityBar(bar)} /></Col>
                        <Col xs={2}>{bar.name}</Col>
                        <Col>
                            {bar.abilityBar.map((ability, i) =>
                                <OverlayTrigger
                                    key={i}
                                    placement="top"
                                    delay={{ show: 500, hide: 250 }}
                                    overlay={<Tooltip id="tooltip-disabled">{ability.name}</Tooltip>}
                                >
                                    <Image className="style-img" src={ability.image} />
                                </OverlayTrigger>
                            )}
                        </Col>
                        <Col xs={2}>
                            <span className="actions">
                                <FaEdit className="action-icon edit" onClick={() => this.setEditAbilityBarShow(true, bar._id)} />
                                <FaTrash className="action-icon delete" onClick={() => this.setShowConfirm(true, bar._id)} />
                            </span>
                        </Col>
                    </Row>
                </ListGroup.Item>
            );
    }

    displayAbilityBar = () => {
        const { barSlots } = this.state;

        return (
            <div className="abilityBar-container">
                <div className="abilityBar">
                    <div className="style-img-container">
                        {barSlots.map((ability, i) =>
                            <OverlayTrigger
                                key={i}
                                placement="top"
                                delay={{ show: 500, hide: 250 }}
                                overlay={<Tooltip id="tooltip-disabled"><span className="item-slot-name">{ability.name}</span></Tooltip>}
                            >
                                <Image className="style-img" src={ability.image} />
                            </OverlayTrigger>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { abilityBar, barSlots, addAbilityBarShow, editAbilityBarShow, filterStyle, hasAbilityBar, abilityBarSet, editFromPreset } = this.state;
        const { isSearching } = this.props.equipmentReducer;

        const searchResults = this.searchResults();

        if (!hasAbilityBar) return (
            <div>
                <div className="step-button">
                    <Button variant="button-secondary" className="previous-button" onClick={() => this.previousStep()}>Previous</Button>
                    <Button variant="button-secondary" onClick={() => this.nextWizardStep()}>Skip</Button>
                </div>
                <div className="activate-component">
                    <Button variant="button-primary" onClick={() => this.enableAbilityBar(true)}>Add Ability Bar</Button>
                </div>
            </div>
        );

        return (
            <Container>
                <div className="AbilityBarPreset">
                    <div className="step-button">
                        <Button variant="button-secondary" className="previous-button" onClick={() => this.previousStep()}>Previous</Button>
                        <Button variant="button-secondary" hidden={!abilityBarSet} onClick={() => this.nextWizardStep()}>Next</Button>
                    </div>
                    {this.confirmModal()}
                    {abilityBarSet ?
                        <div>
                            <div className="step-button">
                                <Button variant="button-secondary" onClick={() => this.clearAbilityBar()}>Change Ability Bar</Button>
                            </div>
                            {this.displayAbilityBar()}
                            <div className="step-button">
                                <Button variant="button-secondary" onClick={() => this.editBar()}>Edit Ability Bar</Button>
                            </div>
                        </div>
                        :
                        <div>
                            <h5>Select Ability Bar:</h5>
                            <div className="spacer-h-2" />
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
                                            <Button variant="button-primary" onClick={() => this.setAddAbilityBarShow(true)}>Add Ability Bar</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formOptions">
                                    <Form.Check
                                        type="radio"
                                        label={<span><Image className="style-img" src="/static_images/RSTools/styles/all_style.png" /> All Styles</span>}
                                        name="formSearchOptions"
                                        id="allStyles"
                                        value={0}
                                        onChange={this.setFilter}
                                        defaultChecked
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={<span><Image className="style-img" src="/static_images/RSTools/styles/melee.png" /> Melee</span>}
                                        name="formSearchOptions"
                                        id="melee"
                                        value={1}
                                        onChange={this.setFilter}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={<span><Image className="style-img" src="/static_images/RSTools/styles/range.png" /> Range</span>}
                                        name="formSearchOptions"
                                        id="range"
                                        value={2}
                                        onChange={this.setFilter}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={<span><Image className="style-img" src="/static_images/RSTools/styles/magic.png" /> Magic</span>}
                                        name="formSearchOptions"
                                        id="magic"
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
                                    <p>No ability bars found...</p>
                            }
                        </div>
                    }
                    <AddAbilityBar
                        show={addAbilityBarShow}
                        equipmentReducer={this.props.equipmentReducer}
                        createAbilityBar={data => this.props.createAbilityBar(data, filterStyle)}
                        onHide={() => this.setAddAbilityBarShow(false)}
                    />
                    <EditAbilityBar
                        show={editAbilityBarShow}
                        abilityBarFromPreset={abilityBar}
                        barSlots={barSlots}
                        setBarSlots={(slots, originalEdited) => this.setBarSlots(slots, originalEdited)}
                        editFromPreset={editFromPreset}
                        equipmentReducer={this.props.equipmentReducer}
                        editAbilityBar={data => this.props.editAbilityBar(data, filterStyle)}
                        onHide={() => this.setEditAbilityBarShow(false)}
                    />
                    <div className="step-button">
                        <Button variant="button-warning" onClick={() => this.enableAbilityBar(false)}>Remove Ability Bar</Button>
                    </div>
                </div>
            </Container>
        );
    }
}

AbilityBarPreset.propTypes = {
    equipmentReducer: PropTypes.object,
    getAbilityBarSingle: PropTypes.func,
    searchAbilityBars: PropTypes.func,
    createAbilityBar: PropTypes.func,
    editAbilityBar: PropTypes.func,
    deleteAbilityBar: PropTypes.func,
    updateAbilityBarData: PropTypes.func,
    clearAbilityBarObj: PropTypes.func
};

const mapStateToProps = state => {
    return {
        equipmentReducer: state.equipmentReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getAbilityBarSingle, searchAbilityBars, createAbilityBar, editAbilityBar, deleteAbilityBar, clearAbilityBarObj }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AbilityBarPreset);
