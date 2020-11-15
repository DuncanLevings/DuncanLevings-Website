/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Button, Container, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './PrayerPreset.scss';
import { EQUIPMENT_CONSTS } from 'consts/RSTools_Consts';

class PrayerPreset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPrayer: false,
            regularPrayer: EQUIPMENT_CONSTS.prayerData.prayers,
            ancientCurses: EQUIPMENT_CONSTS.prayerData.curses,
            prayerType: 0
        }
    }

    componentDidMount() {
        if (this.props.editMode) {
            this.setState({
                hasPrayer: this.props.prayerData.length > 0 ? true : false,
                prayerType: this.props.prayerType ? this.props.prayerType : 0
            });

            if (this.props.prayerType === 1) {
                this.setState({
                    regularPrayer: this.props.prayerData.length > 0 ? this.props.prayerData : EQUIPMENT_CONSTS.prayerData.prayers
                });
            } else if (this.props.prayerType === 2) {
                this.setState({
                    ancientCurses: this.props.prayerData.length > 0 ? this.props.prayerData : EQUIPMENT_CONSTS.prayerData.curses
                });
            }
        }
    }

    setPrayerType = (type) => {
        this.setState({
            prayerType: type,
            regularPrayer: EQUIPMENT_CONSTS.prayerData.prayers,
            ancientCurses: EQUIPMENT_CONSTS.prayerData.curses
        });
    }

    enablePrayer = (bool) => {
        this.setState({ hasPrayer: bool });
        if (!bool) {
            this.props.updatePrayerData([], null);
            this.setState({
                search: '',
                prayerType: 0
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

    selectPrayer = (type, i) => {
        let _prayers = [...this.state[type]];

        let _prayer = null;
        if (_prayers[i].selected) {
            _prayer = _prayers[i];

            delete _prayer.selected;
        } else {
            _prayer = {
                ..._prayers[i],
                selected: true
            }
        }

        _prayers[i] = _prayer;

        this.setState({ [type]: _prayers });
        this.props.updatePrayerData(_prayers, this.state.prayerType);
    }

    getPrayerData = () => {
        const { prayerType, regularPrayer, ancientCurses } = this.state;

        if (prayerType === 1) {
            return regularPrayer.map((prayer, i) =>
                <OverlayTrigger
                    key={i}
                    placement="top"
                    delay={{ show: 500, hide: 250 }}
                    overlay={<Tooltip id="tooltip-disabled">{prayer.name}</Tooltip>}
                >
                    <Image onClick={() => this.selectPrayer('regularPrayer', i)} className={`prayer-img ${prayer.selected ? 'selected' : ''}`} src={prayer.image} />
                </OverlayTrigger>
            );
        } else if (prayerType === 2) {
            return ancientCurses.map((prayer, i) =>
                <OverlayTrigger
                    key={i}
                    placement="top"
                    delay={{ show: 500, hide: 250 }}
                    overlay={<Tooltip id="tooltip-disabled">{prayer.name}</Tooltip>}
                >
                    <Image onClick={() => this.selectPrayer('ancientCurses', i)} className={`prayer-img ${prayer.selected ? 'selected' : ''}`} src={prayer.image} />
                </OverlayTrigger>
            );
        }
    }

    render() {
        const { hasPrayer, prayerType } = this.state;

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
                    <div className="step-button">
                        <Button variant="button-secondary" className="previous-button" onClick={() => this.previousStep()}>Previous</Button>
                        <Button variant="button-secondary" hidden={!hasPrayer} onClick={() => this.nextWizardStep()}>Next</Button>
                    </div>
                    <div className="prayer-selection">
                        <Button variant="button-primary" disabled={prayerType === 1} className="prayer-regular" onClick={() => this.setPrayerType(1)}>Prayers</Button>
                        <Button variant="button-primary" disabled={prayerType === 2} className="prayer-ancient" onClick={() => this.setPrayerType(2)}>Curses</Button>
                    </div>
                    <div className="prayer-container">
                        {prayerType > 0 ?
                            <div className="prayerContainer">
                                {this.getPrayerData()}
                            </div>
                            : null}
                    </div>
                    <div className="step-button">
                        <Button variant="button-warning" onClick={() => this.enablePrayer(false)}>Remove Prayer</Button>
                    </div>
                </div>
            </Container>
        );
    }
}

PrayerPreset.propTypes = {
    updatePrayerData: PropTypes.func
};

export default PrayerPreset;
