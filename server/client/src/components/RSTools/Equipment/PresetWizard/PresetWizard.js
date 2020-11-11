/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Button, Container, Form, FormControl, InputGroup, Spinner } from 'react-bootstrap';
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
            step: 1,
            progress: 1,
            stepData: ['Equipment', 'Inventory', 'Familiar', 'Prayer', 'Overview'],
            name: '',
            equipSlotData: []
        }
    }

    componentDidMount() {

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
                progress = 25;
                break;
            default:
                break;
        }
        this.setState({
            step: step,
            progress: progress
        });
    }

    submitCheck = () => {
        const { step, stepData, equipSlotData } = this.state;

        if (step === 2) {
            // there must be at least one of the following true
            if (equipSlotData.length > 0) {
                return (
                    <div className="submit-button">
                        <Button
                            variant="button-primary"
                            onClick={() => this.submit()}
                            disabled={false}>Submit {false ? <Spinner animation="border" variant="light" size="sm" /> : null}</Button>
                    </div>
                );
            }
        }
    }

    submit = () => {
        const { name, equipSlotData } = this.state;

        if (name === '') return this.setState({ missingName: true });
        this.setState({ missingName: false });

        const data = {
            name: name,
            equipSlotData: equipSlotData
        }

        // this.props.createPreset(data);
    }

    render() {
        const { step, progress, stepData, missingName } = this.state;

        return (
            <Container>
                <div className="PresetWizard">
                    <div className='step-progress'>
                        <Stepper progress={progress} stepData={stepData} />
                        <div className="spacer-h-3" />
                        <div className="input-preset-name">
                            <div className="preset-error">
                                <p>{missingName ? "Name is missing!" : ''}</p>
                            </div>
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
                                            onChange={this.setName}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Form>
                        </div>
                        <StepWizard initialStep={step}>
                            <EquipmentPreset
                                updateEquipData={data => this.updateEquipData(data)}
                                setCurrentStep={step => this.setCurrentStep(step)}
                            />
                            <PresetOverview
                                equipSlotData={this.state.equipSlotData}
                                setCurrentStep={step => this.setCurrentStep(step)}
                            />
                        </StepWizard>
                        {this.submitCheck()}
                    </div>
                </div>
            </Container>
        );
    }
}

PresetWizard.propTypes = {};

PresetWizard.defaultProps = {};

export default PresetWizard;
