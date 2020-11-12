/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Container, Form, FormControl, InputGroup, Spinner } from 'react-bootstrap';
import { getPresetSingle, createPreset, editPreset } from 'store/actions/RSTools/presetActions';
import EquipmentPreset from '../PresetComponents/EquipmentPreset/EquipmentPreset.lazy';
import PresetOverview from '../PresetComponents/PresetOverview/PresetOverview.lazy';
import Stepper from 'components/tools/Stepper/Stepper';
import StepWizard from 'react-step-wizard';
import PropTypes from 'prop-types';
import './PresetWizard.scss';

class PresetWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            step: 1,
            progress: 1,
            stepData: ['Equipment', 'Inventory', 'Familiar', 'Abilitys', 'Prayer', 'Overview'],
            name: '',
            equipSlotData: [],
            inventorySlotData: [],
            familiar: null,
            familiarInventorySlotData: [],
            abilityBarData: [],
            // prayerData: []
        }
    }

    componentDidMount() {
        if (this.props.location.state && this.props.location.state.editMode) {
            this.setState({ editMode: this.props.location.state.editMode });
            this.props.getPresetSingle(this.props.location.state.presetId)
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.presetReducer.editPresetObj !== prevProps.presetReducer.editPresetObj) {
            if (this.state.editMode) {
                this.setState({
                    name: this.props.presetReducer.editPresetObj.name,
                    equipSlotData: this.props.presetReducer.editPresetObj.equipSlotData
                });
            }
        }
    }

    setName = e => {
        this.setState({ name: e.target.value });
    }

    updateEquipData = (data) => {
        this.setState({ equipSlotData: data });
    }

    setCurrentStep = (step) => {
        let progress = 0;
        switch (step) {
            case 2:
                progress = 20;
                break;
            default:
                break;
        }
        this.setState({
            step: step,
            progress: progress
        });
    }

    generateForm = () => {
        const { editMode, name } = this.state;
        const { editPresetObj, isFetchingSingle } = this.props.presetReducer;

        const form = (
            <Form>
                <Form.Group controlId="formSearch">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Preset Name:</InputGroup.Text>
                        </InputGroup.Prepend >
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

        if (editMode) {
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
        const { step, editMode, equipSlotData } = this.state;
        const { editPresetObj, isFetchingSingle } = this.props.presetReducer;

        const stepWizard = (
            <StepWizard initialStep={step}>
                <EquipmentPreset
                    editMode={editMode}
                    equipSlotData={equipSlotData}
                    updateEquipData={data => this.updateEquipData(data)}
                    setCurrentStep={step => this.setCurrentStep(step)}
                />
                <PresetOverview
                    equipSlotData={equipSlotData}
                    createOrEdit={true}
                    setCurrentStep={step => this.setCurrentStep(step)}
                />
            </StepWizard>
        );

        if (editMode) {
            if (isFetchingSingle) {
                return null;
            } else if (editPresetObj) {
                return stepWizard;
            }
        }

        return stepWizard;
    }

    submitCheck = () => {
        const { step, stepData, equipSlotData } = this.state;
        const { isCreating } = this.props.presetReducer;

        if (step === 2) {
            // there must be at least one of the following true
            if (equipSlotData.length > 0) {
                return (
                    <div className="submit-button">
                        <Button
                            variant="button-primary"
                            onClick={() => this.submit()}
                            disabled={isCreating}>Submit {isCreating ? <Spinner animation="border" variant="light" size="sm" /> : null}</Button>
                    </div>
                );
            }
        }
    }

    submit = () => {
        const { editMode, name, equipSlotData } = this.state;

        if (name === '') return this.setState({ missingName: true });
        this.setState({ missingName: false });

        const data = {
            name: name,
            equipSlotData: equipSlotData
        }

        if (editMode) this.props.editPreset(data);
        else this.props.createPreset(data);
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
    editPreset: PropTypes.func
};

const mapStateToProps = state => {
    return {
        presetReducer: state.presetReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getPresetSingle, createPreset, editPreset }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PresetWizard);
