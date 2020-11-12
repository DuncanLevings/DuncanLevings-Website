/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Button, Col, Container, Image, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './PresetOverview.scss';

class PresetOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    generateEquipSlots = () => {
        const { equipSlotData } = this.props;
        if (equipSlotData.length < 1) return null;

        return equipSlotData.map((slot, i) => {
            let slotSet = false;
            if (slot.name && slot.image) {
                slotSet = true;
            }

            return (
                <div key={i} className={
                    `slot left-${slot.left} top-${slot.top} 
                    ${slotSet ? 'slotSet' : ''}`}>
                    {this.populateEquipSlotData(slot, i, slotSet)}
                </div>
            )
        });
    }

    populateEquipSlotData = (slot, i, slotSet) => {
        if (slotSet) {
            return (
                <OverlayTrigger
                    key={i}
                    placement="top"
                    delay={{ show: 500, hide: 1000 }}
                    overlay={
                        <Tooltip id="tooltip-disabled">
                            <span className="item-slot-name">{slot.name}</span>
                            {slot.wiki ? <a target="_" href={slot.wiki}> Wiki</a> : null}
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
                    <Image className="slot-image" src={"https://storage.googleapis.com/duncanlevings.appspot.com/5f0371760174273ce430c37d_1604963204155"} />
                </OverlayTrigger>
            );
        }

        return null;
    }

    generateSections = () => {
        const { equipSlotData } = this.props;
        let equipCol, invenCol, summonCol = null;

        if (equipSlotData.length > 0) {
            equipCol = (
                <div className="slot-container">
                    <div className="slotContainer">
                        <div className="slots">
                            {this.generateEquipSlots()}
                        </div>
                    </div>
                </div>
            );
        }

        if (false) {
            invenCol = (
                <div className="inventory-container">
                    <div className="inventoryContainer">
                        <div className="inventory">
                            <div className='clickableArea' />
                        </div>
                    </div>
                </div>
            );
        }

        if (false) {
            summonCol = (
                <div className="summon-container">
                    {false ?
                        <div className="summon-inventory-container">
                            <div className="summon-slot"></div>
                        </div>
                        : null}
                    <div className="summon-image-container">
                        <Image src={"https://storage.googleapis.com/duncanlevings.appspot.com/5f0371760174273ce430c37d_1604963204155"} />
                    </div>
                </div>
            );
        }

        return (
            <div className="row-container">
                {equipCol}
                {invenCol}
                {summonCol}
            </div>
        )
    }

    previousStep = () => {
        this.props.setCurrentStep(this.props.currentStep - 1);
        this.props.previousStep();
    }

    previousButton = () => {
        if (this.props.createOrEdit) {
            return (
                <div className="step-button">
                    <Button variant="button-secondary" onClick={() => this.previousStep()}>Previous</Button>
                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <Container>
                <div className="PresetOverview">
                    {this.previousButton()}
                    {this.generateSections()}
                    <Row>
                        <Col xs={8}><div className="col-container"></div></Col>
                        <Col><div className="col-container"></div></Col>
                    </Row>
                </div>
            </Container>
        );
    }
}

PresetOverview.propTypes = {
    equipSlotData: PropTypes.array,
    setCurrentStep: PropTypes.func
};

PresetOverview.defaultProps = {};

export default PresetOverview;
