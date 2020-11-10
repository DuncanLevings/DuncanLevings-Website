/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { EQUIPMENT_CONSTS } from 'consts/RSTools_Consts';
import PropTypes from 'prop-types';
import './SlotSelector.scss';

class SlotSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slots: EQUIPMENT_CONSTS.slotPositions
        }
    }

    componentDidMount() {

    }

    selectSlot = (i) => {
        this.props.setSelected(i);
    }

    render() {
        const { slots } = this.state;

        const slotList = slots.map((slot, i) => {
            return (
                <div key={i} className={`slot left-${slot.left} top-${slot.top}`} onClick={() => this.selectSlot(i)}></div>
            )
        });

        return (
            <div className="SlotSelector">
                <div className="slotContainer">
                    <div className="slots">
                        {slotList}
                    </div>
                </div>
                <div className="inventoryContainer">
                    <div className="inventory">
                        <div className='clickableArea' onClick={() => this.selectSlot(13)} />
                    </div>
                </div>
                <div className="summonContainer">
                    <div className="summonSlot">
                        <div className='clickableArea' onClick={() => this.selectSlot(14)} />
                    </div>
                </div>
            </div>
        );
    }
}

SlotSelector.propTypes = {
    setSelected: PropTypes.func.isRequired
};

export default SlotSelector;
