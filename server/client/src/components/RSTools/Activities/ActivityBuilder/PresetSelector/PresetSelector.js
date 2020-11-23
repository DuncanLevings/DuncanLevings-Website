/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPresets, deletePreset, clearPreset } from 'store/actions/RSTools/presetActions';
import { Button, Col, Form, FormControl, Image, InputGroup, ListGroup, Modal, Row, Spinner } from 'react-bootstrap';
import { FaCheckSquare, FaEdit, FaTrash } from 'react-icons/fa';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import PresetOverview from 'components/RSTools/Equipment/PresetComponents/PresetOverview/PresetOverview.lazy';
import PropTypes from 'prop-types';
import './PresetSelector.scss';

class PresetSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            presetSet: false,
            preset: null,
            selectedPresetId: null,
            useExistingPreset: false,
            showConfirm: false
        }
    }

    componentDidMount() {
        if (this.props.editMode) {
            this.setState({
                preset: this.props.presetReducer.savedPreset ? null : this.props.preset,
                presetSet: true
            });
        }

        if (this.props.presetReducer.savedPreset) {
            this.setState({
                preset: this.props.presetReducer.savedPreset,
                presetSet: true
            });
            this.props.updatePreset(this.props.presetReducer.savedPreset);
        }
    }

    navigate = (route, states) => {
        const { pathname } = this.props.location;
        const state = {
            from: pathname
        }

        this.props.history.push({
            pathname: route,
            state: { ...state, ...states }
        });
    }

    nextWizardStep = () => {
        this.props.setCurrentStep(this.props.currentStep + 1);
        this.props.nextStep();
    }

    setSearch = e => {
        this.setState({ search: e.target.value });
    }

    setUseExisting = (bool) => {
        this.setState({ useExistingPreset: bool });
        if (bool) this.props.getPresets();
    }

    presetOptions = () => {
        const { presetSet, useExistingPreset } = this.state;

        if (!presetSet) {
            return (
                <div className="select-preset-container">
                    <Button variant="button-primary" disabled={useExistingPreset} onClick={() => this.setUseExisting(true)}>Select Preset</Button>
                    <div className="spacer-h-2" />
                    <Button variant="button-primary" onClick={() => this.navigate(RSTOOL_ROUTES.PRESET_BUILDER, {
                        activityUseEmpty: true,
                        routeState: this.props.routeState
                    })}>Use Empty Preset</Button>
                </div>
            )
        }
    }

    setExistingPreset = (preset) => {
        this.setState({
            preset: preset,
            useExistingPreset: false,
            presetSet: true
        });
        this.props.updatePreset(preset);
    }

    getResults = () => {
        const { search } = this.state;
        const { presets } = this.props.presetReducer;

        return presets.filter(preset => search === '' || preset.name.toLowerCase().includes(search.toLowerCase()))
            .map((preset, i) =>
                <ListGroup.Item key={i}>
                    <Row>
                        <Col xs={1}>
                            <span className="actions">
                                <FaCheckSquare className="action-icon add" onClick={() => this.setExistingPreset(preset)} />
                            </span>
                        </Col>
                        <Col xs={3}>
                            {preset.name}
                        </Col>
                        <Col xs={3}>
                            {preset.equipSlotData.length > 0 ? <Image src={"/static_images/RSTools/equipment_icon.png"} /> : null}
                            {preset.inventorySlotData.length > 0 ? <Image src={"/static_images/RSTools/inventory_icon.png"} /> : null}
                            {preset.familiar ? <Image src={"/static_images/RSTools/familiar_icon.png"} /> : null}
                            {preset.abilityBarData.length > 0 ? <Image src={"/static_images/RSTools/abilitys_icon.png"} /> : null}
                            {preset.prayerData.length > 0 ? <Image src={"/static_images/RSTools/prayer_icon.png"} /> : null}
                        </Col>
                        <Col>
                            <span className="actions">
                                <FaEdit className="action-icon edit" onClick={() => this.navigate(RSTOOL_ROUTES.PRESET_BUILDER, {
                                    activityEditExisting: true,
                                    editMode: true,
                                    presetId: preset._id,
                                    routeState: this.props.routeState
                                })} />
                                <FaTrash className="action-icon delete" onClick={() => this.setShowConfirm(true, preset._id)} />
                            </span>
                        </Col>
                    </Row>
                </ListGroup.Item>
            );
    }

    selectPreset = () => {
        const { useExistingPreset } = this.state;
        const { isFetching } = this.props.presetReducer;

        if (useExistingPreset) {
            const searchResults = this.getResults();

            return (
                <div>
                    <div className="spacer-h-3" />
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
                                    <Button variant="button-primary" onClick={() => this.navigate(RSTOOL_ROUTES.PRESET_BUILDER, {
                                        activityAddPreset: true,
                                        routeState: this.props.routeState
                                    })}>Add Preset</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                    {isFetching ?
                        <Spinner animation="border" variant="light" /> :
                        searchResults.length > 0 ?
                            <ListGroup variant="flush" className="scrollable-list">
                                {searchResults}
                            </ListGroup> :
                            <p>No presets found...</p>
                    }
                </div>
            );
        }
    }

    changePreset = () => {
        this.setState({
            presetSet: false,
            preset: null
        });
        this.props.clearPreset();
        this.props.updatePreset(null);
    }

    showPreset = () => {
        const { presetSet, preset } = this.state;

        if (presetSet && preset) {
            return (
                <div>
                    <div className="step-button">
                        <Button variant="button-secondary" onClick={() => this.nextWizardStep()}>Next</Button>
                    </div>
                    <div className="select-preset-container">
                        <Button variant="button-secondary" onClick={() => this.changePreset(false)}>Change Selected Preset</Button>
                    </div>
                    <div className="spacer-h-2" />
                    <PresetOverview
                        equipSlotData={preset.equipSlotData}
                        inventorySlotData={preset.inventorySlotData}
                        familiar={preset.familiar}
                        familiarSlotData={preset.familiarSlotData}
                        abilityBarData={preset.abilityBarData}
                        prayerData={preset.prayerData}
                    />
                    <div className="spacer-h-2" />
                    <div className="select-preset-container">
                        <Button variant="button-secondary" onClick={() => this.navigate(RSTOOL_ROUTES.PRESET_BUILDER, {
                            preset: preset,
                            activityEdit: true,
                            editMode: this.props.editMode || false,
                            routeState: this.props.routeState
                        })}>Edit</Button>
                    </div>
                </div>
            )
        }
    }

    setShowConfirm = (bool, presetId = null) => {
        this.setState({
            showConfirm: bool,
            selectedPresetId: presetId ? presetId : this.state.selectedPresetId
        });
    }

    deletePreset = () => {
        this.props.deletePreset(this.state.selectedPresetId);
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
                    <p>Are you sure you wish to delete this preset?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="button-secondary" onClick={() => this.setShowConfirm(false)}>Cancel</Button>
                    <Button variant="button-warning" onClick={() => this.deletePreset()}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    render() {
        return (
            <div className="PresetSelector">
                {this.presetOptions()}
                {this.selectPreset()}
                {this.showPreset()}
                {this.confirmModal()}
            </div>
        );
    }
}

PresetSelector.propTypes = {
    presetReducer: PropTypes.object,
    getPresets: PropTypes.func,
    deletePreset: PropTypes.func,
    clearPreset: PropTypes.func,
    clearError: PropTypes.func
};

const mapStateToProps = state => {
    return {
        presetReducer: state.presetReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getPresets, deletePreset, clearPreset }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PresetSelector));