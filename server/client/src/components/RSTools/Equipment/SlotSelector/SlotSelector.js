/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import PropTypes from 'prop-types';
import './SlotSelector.scss';

class SlotSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slots: [
                {
                    left: 1,
                    top: 1
                },
                {
                    left: 2,
                    top: 1
                },
                {
                    left: 3,
                    top: 1
                },
                {
                    left: 1,
                    top: 2
                },
                {
                    left: 2,
                    top: 2
                },
                {
                    left: 3,
                    top: 2
                },
                {
                    left: 4,
                    top: 3
                },
                {
                    left: 2,
                    top: 3
                },
                {
                    left: 5,
                    top: 3
                },
                {
                    left: 2,
                    top: 4
                },
                {
                    left: 4,
                    top: 5
                },
                {
                    left: 2,
                    top: 5
                },
                {
                    left: 5,
                    top: 5
                }
            ]
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