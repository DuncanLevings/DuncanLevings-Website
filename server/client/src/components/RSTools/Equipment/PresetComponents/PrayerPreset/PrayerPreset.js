/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Button, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './PrayerPreset.scss';

class PrayerPreset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPrayer: false
        }
    }

    componentDidMount() {

    }

    enablePrayer = (bool) => {
        this.setState({ hasPrayer: bool });
        // if (!bool) {
        //     this.props.updateEquipData([]);
        //     this.setState({ 
            // search: '',
        //         slots: EQUIPMENT_CONSTS.slotPositions,
        //         selectedSlot: -1
        //     });
        // }
    }

    nextWizardStep = () => {
        this.props.setCurrentStep(this.props.currentStep + 1);
        this.props.nextStep();
    }

    previousStep = () => {
        this.props.setCurrentStep(this.props.currentStep - 1);
        this.props.previousStep();
    }

    render() {
        const { hasPrayer } = this.state;

        if (!hasPrayer) return (
            <div>
                <div className="step-button">
                    <Button variant="button-secondary" className="previous-button" onClick={() => this.previousStep()}>Previous</Button>
                    <Button variant="button-secondary" onClick={() => this.nextWizardStep()}>Skip</Button>
                </div>
                <div className="activate-component">
                    <Button variant="button-primary" onClick={() => this.enablePrayer(true)}>Add Prayer</Button>
                </div>
            </div>
        );

        return (
            <Container>
                <div className="PrayerPreset">
                    <h1>PrayerPreset component</h1>
                </div>
            </Container>
        );
    }
}

PrayerPreset.propTypes = {};

PrayerPreset.defaultProps = {};

export default PrayerPreset;
