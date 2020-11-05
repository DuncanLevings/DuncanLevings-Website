/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
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
            ],
            filter: []
        }
    }

    componentDidMount() {
    }

    filterSlot = (i) => {
        // remove if already selected
        if (this.state.filter.includes(i)) {
            this.setState({
                filter: this.state.filter.filter((slot) => {
                    return slot !== i
                })
            },
            () => {
                this.props.filterSelected(this.state.filter);
            });
        } else {
            this.setState(prevState => ({
                filter: [...prevState.filter, i]
            }),
            () => {
                this.props.filterSelected(this.state.filter);
            });
        }
    }

    clearFilter = () => {
        this.setState({ 
                filter: [] 
            }, () => {
                this.props.filterSelected(this.state.filter);
            });
    };

    render() {
        const { slots, filter } = this.state;

        const slotList = slots.map((slot, i) => {
            let selected = false;
            if (filter.includes(i)) {
                selected = true;
            }

            return (
                <div key={i} className={`slot left-${slot.left} top-${slot.top} ${selected ? 'selected' : ''}`} onClick={() => this.filterSlot(i)}></div>
            )
        });

        let inventorySelected = false;
        if (filter.includes(14)) inventorySelected = true;

        return (
            <div className="SlotSelector">
                <h4>Select slot(s) to filter</h4>
                <div className="slotDiv">
                    <div className="slotContainer">
                        <div className="slots">
                            {slotList}
                        </div>
                    </div>
                </div>
                <div className="inventoryDiv">
                    <div className="inventoryContainer">
                        <div className="inventory">
                            <div className={`clickableArea ${inventorySelected ? 'selected' : ''}`} onClick={() => this.filterSlot(14)} />
                        </div>
                    </div>
                </div>
                <div className="clear-filter">
                    <Button variant="button-secondary" onClick={() => this.clearFilter()}><FaTimes /> Clear</Button>
                </div>
            </div>
        );
    }
}

SlotSelector.propTypes = {
    filterSelected: PropTypes.func.isRequired
};

export default SlotSelector;
