/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Container, Form, FormControl, InputGroup, Spinner } from 'react-bootstrap';
import { getPresetSingle, createPreset, editPreset, clearErrors } from 'store/actions/RSTools/presetActions';
import EquipmentPreset from '../PresetComponents/EquipmentPreset/EquipmentPreset.lazy';
import PresetOverview from '../PresetComponents/PresetOverview/PresetOverview.lazy';
import InventoryPreset from '../PresetComponents/InventoryPreset/InventoryPreset.lazy';
import FamiliarPreset from '../PresetComponents/FamiliarPreset/FamiliarPreset.lazy';
import Stepper from 'components/tools/Stepper/Stepper';
import StepWizard from 'react-step-wizard';
import PropTypes from 'prop-types';
import './PresetWizard.scss';

class PresetWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editRetrieved: false,
            step: 1,
            progress: 1,
            stepData: ['Equipment', 'Inventory', 'Familiar', 'Abilitys', 'Prayer', 'Overview'],
            name: '',
            equipSlotData: [],
            inventorySlotData: [],
            familiar: null,
            familiarSlotData: [],
            abilityBarData: [],
            // prayerData: []
        }
    }

    componentDidMount() {
        if (this.checkEditMode()) {
            this.props.getPresetSingle(this.props.location.state.presetId)
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.presetReducer.editPresetObj !== prevProps.presetReducer.editPresetObj) {
            if (this.checkEditMode()) {
                const preset = this.props.presetReducer.editPresetObj;
                this.setState({
                    editRetrieved: true, // to tell render the states have been set for edit object
                    name: preset.name,
                    equipSlotData: preset.equipSlotData,
                    inventorySlotData: preset.inventorySlotData,
                    familiar: preset.familiar || null,
                    familiarSlotData: preset.familiarSlotData
                });
            }
        }
    }

    checkEditMode = () => {
        return this.props.location.state && this.props.location.state.editMode;
    }

    setName = e => {
        this.setState({ name: e.target.value });
    }

    updateEquipData = (data) => {
        this.setState({ equipSlotData: data });
    }

    updateInventoryData = (data) => {
        this.setState({ inventorySlotData: data });
    }

    updateFamiliarData = (data) => {
        this.setState({ familiar: data });
    }

    updateFamiliarSlotData = (data) => {
        this.setState({ familiarSlotData: data });
    }

    setCurrentStep = (step) => {
        let progress = 0;
        switch (step) {
            case 2:
                progress = 20;
                break;
            case 3:
                progress = 40;
                break;
            case 4:
                progress = 60;
                break;
            default:
                break;
        }
        this.setState({
            step: step,
            progress: progress
        });
        this.props.clearErrors();
    }

    generateForm = () => {
        const { name } = this.state;
        const { editPresetObj, isFetchingSingle } = this.props.presetReducer;

        const form = (
            <Form>
                <Form.Group controlId="formSearch">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Preset Name:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="name..."
                            aria-label="name"
                            aria-describedby="name"
                            value={name}
                            onChange={this.setName}
                        />
                    </InputGroup >
                </Form.Group >
            </Form>
        );

        if (this.checkEditMode()) {
            if (isFetchingSingle) {
                return (
                    <Spinner animation="border" variant="light" />
                );
            } else if (editPresetObj) {
                return form;
            }
        }

        return form;
    }

    generateStepWizard = () => {
        const { step, editRetrieved, equipSlotData, inventorySlotData, familiar, familiarSlotData } = this.state;
        const { isFetchingSingle } = this.props.presetReducer;

        if (this.checkEditMode()) {
            if (isFetchingSingle || !editRetrieved) {
                return null;
            } else {
                return (
                    <StepWizard initialStep={step}>
                        <EquipmentPreset
                            editMode={true}
                            equipSlotData={equipSlotData}
                            updateEquipData={data => this.updateEquipData(data)}
                            setCurrentStep={step => this.setCurrentStep(step)}
                        />
                        <InventoryPreset
                            editMode={true}
                            inventorySlotData={inventorySlotData}
                            updateInventoryData={data => this.updateInventoryData(data)}
                            setCurrentStep={step => this.setCurrentStep(step)}
                        />
                        <FamiliarPreset
                            editMode={true}
                            familiar={familiar}
                            familiarSlotData={familiarSlotData}
                            updateFamiliarData={data => this.updateFamiliarData(data)}
                            updateFamiliarSlotData={data => this.updateFamiliarSlotData(data)}
                            setCurrentStep={step => this.setCurrentStep(step)}
                        />
                        <PresetOverview
                            createOrEdit={true}
                            equipSlotData={equipSlotData}
                            inventorySlotData={inventorySlotData}
                            familiar={familiar}
                            familiarSlotData={familiarSlotData}
                            setCurrentStep={step => this.setCurrentStep(step)}
                        />
                    </StepWizard>
                );
            }
        }

        return (
            <StepWizard initialStep={step}>
                <EquipmentPreset
                    updateEquipData={data => this.updateEquipData(data)}
                    setCurrentStep={step => this.setCurrentStep(step)}
                />
                <InventoryPreset
                    updateInventoryData={data => this.updateInventoryData(data)}
                    setCurrentStep={step => this.setCurrentStep(step)}
                />
                <FamiliarPreset
                    updateFamiliarData={data => this.updateFamiliarData(data)}
                    updateFamiliarSlotData={data => this.updateFamiliarSlotData(data)}
                    setCurrentStep={step => this.setCurrentStep(step)}
                />
                <PresetOverview
                    createOrEdit={true}
                    equipSlotData={equipSlotData}
                    inventorySlotData={inventorySlotData}
                    familiar={familiar}
                    familiarSlotData={familiarSlotData}
                    setCurrentStep={step => this.setCurrentStep(step)}
                />
            </StepWizard>
        );
    }

    submitCheck = () => {
        const { step, stepData, equipSlotData, inventorySlotData, familiar, familiarSlotData } = this.state;
        const { isCreating, isSaving } = this.props.presetReducer;

        if (step === 4) {
            // there must be at least one of the following true
            if (equipSlotData.length > 0 ||
                inventorySlotData.length > 0 ||
                familiar || familiarSlotData.length > 0) {
                return (
                    <div className="submit-button">
                        <Button
                            variant="button-primary"
                            onClick={() => this.submit()}
                            disabled={isCreating || isSaving}>Submit {isCreating || isSaving ? <Spinner animation="border" variant="light" size="sm" /> : null}</Button>
                    </div>
                );
            }
        }
    }

    submit = () => {
        const { editPresetObj } = this.props.presetReducer;
        const { name, equipSlotData, inventorySlotData, familiar, familiarSlotData } = this.state;

        if (name === '') return this.setState({ missingName: true });
        this.setState({ missingName: false });

        const data = {
            name: name,
            equipSlotData: equipSlotData,
            inventorySlotData: inventorySlotData,
            familiar: familiar,
            familiarSlotData: familiarSlotData
        }

        if (this.checkEditMode()) {
            data.presetId = editPresetObj._id;
            this.props.editPreset(data);
        } else {
            this.props.createPreset(data);
        }
    }

    render() {
        const { progress, stepData, missingName } = this.state;
        const { error } = this.props.presetReducer;

        return (
            <Container>
                <div className="PresetWizard">
                    <div className='step-progress'>
                        <Stepper progress={progress} stepData={stepData} />
                        <div className="spacer-h-3" />
                        <div className="input-preset-name">
                            <div className="preset-error">
                                <p>{error}</p>
                                <p>{missingName ? "Name is missing!" : ''}</p>
                            </div>
                            {this.generateForm()}
                        </div>
                        {this.generateStepWizard()}
                        {this.submitCheck()}
                    </div>
                </div>
            </Container>
        );
    }
}

PresetWizard.propTypes = {
    presetReducer: PropTypes.object,
    getPresetSingle: PropTypes.func,
    createPreset: PropTypes.func,
    editPreset: PropTypes.func,
    clearErrors: PropTypes.func
};

const mapStateToProps = state => {
    return {
        presetReducer: state.presetReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getPresetSingle, createPreset, editPreset, clearErrors }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PresetWizard);
