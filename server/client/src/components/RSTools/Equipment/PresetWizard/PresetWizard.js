/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Container, Form, FormControl, InputGroup } from 'react-bootstrap';
import EquipmentPreset from '../PresetComponents/EquipmentPreset/EquipmentPreset.lazy';
import PresetOverview from '../PresetComponents/PresetOverview/PresetOverview.lazy';
import StepWizard from 'react-step-wizard';
import PropTypes from 'prop-types';
import './PresetWizard.scss';
import Stepper from 'components/tools/Stepper/Stepper';

class PresetWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            progress: 1,
            stepData: ['Equipment', 'Inventory', 'Familiar', 'Prayer', 'Overview'],
            name: ''
        }
    }

    componentDidMount() {

    }

    setName = e => {
        this.setState({ name: e.target.value });
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
        this.setState({ progress: progress });
    }

    render() {
        const { step, progress, stepData } = this.state;

        return (
            <Container>
                <div className="PresetWizard">
                    <div className='step-progress'>
                        <Stepper progress={progress} stepData={stepData} />
                        <div className="spacer-h-3" />
                        <div className="input-preset-name">
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
                            <EquipmentPreset setCurrentStep={step => this.setCurrentStep(step)} />
                            <PresetOverview setCurrentStep={step => this.setCurrentStep(step)} />
                        </StepWizard>
                    </div>
                </div>
            </Container>
        );
    }
}

PresetWizard.propTypes = {};

PresetWizard.defaultProps = {};

export default PresetWizard;
