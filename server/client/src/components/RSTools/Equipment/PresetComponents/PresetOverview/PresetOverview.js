/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Button, Container, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
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
                    delay={{ show: 500, hide: 750 }}
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
                    <Image className="slot-image" src={slot.image} />
                </OverlayTrigger>
            );
        }

        return null;
    }

    generateInventorySlots = () => {
        const { inventorySlotData } = this.props;

        return inventorySlotData.map((slot, index) =>
            slot.name && slot.image ?
                <OverlayTrigger
                    key={index}
                    placement="top"
                    delay={{ show: 500, hide: 750 }}
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
                        </Tooltip>}
                >
                    <div className='inventory-slot'>
                        <Image className="inventory-img" src={slot.image} />
                    </div>
                </OverlayTrigger>
                :
                <div key={index} className='inventory-slot' />
        );
    }

    generateFamiliarInventorySlots = () => {
        const { familiar, familiarSlotData } = this.props;

        return familiarSlotData.map((slot, index) => (
            index < familiar.familiarSize ?
                slot.name && slot.image ?
                    <OverlayTrigger
                        key={index}
                        placement="top"
                        delay={{ show: 750, hide: 500 }}
                        overlay={<Tooltip id="tooltip-disabled">
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
                        </Tooltip>}
                    >
                        <div className='summon-slot'>
                            <Image className="inventory-img" src={slot.image} />
                        </div>
                    </OverlayTrigger>
                    :
                    <div key={index} className='summon-slot' />
                : null
        ));
    }

    generateAbilityBar = () => {
        const { abilityBarData } = this.props;

        return (
            abilityBarData.map((ability, i) =>
                <OverlayTrigger
                    key={i}
                    placement="top"
                    delay={{ show: 500, hide: 250 }}
                    overlay={<Tooltip id="tooltip-disabled"><span className="item-slot-name">{ability.name}</span></Tooltip>}
                >
                    <Image className="style-img" src={ability.image} />
                </OverlayTrigger>
            )
        );
    }

    generatePrayer = () => {
        const { prayerData } = this.props;

        return prayerData.map((prayer, i) =>
            prayer.selected ?
                <OverlayTrigger
                    key={i}
                    placement="top"
                    delay={{ show: 500, hide: 250 }}
                    overlay={<Tooltip id="tooltip-disabled"><span className="item-slot-name">{prayer.name}</span></Tooltip>}
                >
                    <Image className='prayer-img' src={prayer.image} />
                </OverlayTrigger>
                : null
        );
    }

    generateSections = () => {
        const { equipSlotData, inventorySlotData, familiar, familiarSlotData, abilityBarData, prayerData } = this.props;
        let equipment, inventory, summon, summonInventory, abilitys, prayer = null;

        if (equipSlotData.length > 0) {
            equipment = (
                <div className="slot-container">
                    <div className="slotContainer">
                        <div className="slots">
                            {this.generateEquipSlots()}
                        </div>
                    </div>
                </div>
            );
        }

        if (inventorySlotData.length > 0) {
            inventory = (
                <div className="inventory-container">
                    <div className="inventoryContainer">
                        <div className="inventory-slots-container">
                            {this.generateInventorySlots()}
                        </div>
                    </div>
                </div>
            );
        }

        if (familiar) {
            if (familiarSlotData.length > 0) {
                summonInventory = (
                    <div className="summon-container">
                        <div className="summon-inventoryContainer">
                            {this.generateFamiliarInventorySlots()}
                        </div>
                    </div>
                );
            }

            summon = (
                <div className="summon-container">
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 750, hide: 500 }}
                        overlay={<Tooltip id="tooltip-disabled">
                            <span className="item-slot-name">{familiar.name}</span>
                            {familiar.wiki ? <a target="_blank" href={familiar.wiki} rel="noopener noreferrer"> Wiki</a> : null}
                        </Tooltip>}
                    >
                        <div className="summon-image-container">
                            <Image src={familiar.imageUrl} />
                        </div>
                    </OverlayTrigger>
                </div>
            );
        }

        if (abilityBarData.length > 0) {
            abilitys = (
                <div className="abilityBar-container">
                    <div className="abilityBar">
                        <div className="style-img-container">
                            {this.generateAbilityBar()}
                        </div>
                    </div>
                </div>
            );
        }

        if (prayerData.length > 0) {
            prayer = (
                <div className="prayer-container">
                    <div className="prayerContainer">
                        {this.generatePrayer()}
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div className="row-container">
                    {equipment}
                    {inventory}
                    {summonInventory}
                    {summon}
                </div>
                {abilitys ?
                    <div className="row-container">
                        {abilitys}
                    </div>
                    : null}
                {prayer ?
                    <div className="row-container">
                        {prayer}
                    </div>
                    : null}
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
                </div>
            </Container>
        );
    }
}

PresetOverview.propTypes = {
    equipSlotData: PropTypes.array.isRequired,
    inventorySlotData: PropTypes.array.isRequired,
    setCurrentStep: PropTypes.func
};

PresetOverview.defaultProps = {};

export default PresetOverview;
