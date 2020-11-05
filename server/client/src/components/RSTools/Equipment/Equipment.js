/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { EQUIPMENT_CONSTS } from 'consts/RSTools_Consts';
import SlotSelector from './SlotSelector/SlotSelector.lazy';
import PropTypes from 'prop-types';
import './Equipment.scss';

class Equipment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    handleSelect = key => {
        // switch (parseInt(key)) {
        //     case DAILY_CONSTS.DAILY:
        //         this.setDataType(DAILY_CONSTS.DAILY);
        //         break;
        //     case DAILY_CONSTS.WEEKLY:
        //         this.setDataType(DAILY_CONSTS.WEEKLY);
        //         break;
        //     case DAILY_CONSTS.MONTHLY:
        //         this.setDataType(DAILY_CONSTS.MONTHLY);
        //         break;
        //     default:
        //         break;
        // }
    }

    // test = (a) => {
    //     console.log(a)
    //     <SlotSelector filterSelected={a => this.test(a)} />
    // }

    render() {
        return (
            <div className="Equipment">
                <Tabs defaultActiveKey={EQUIPMENT_CONSTS.ITEMS} id="equipment-dash" onSelect={this.handleSelect}>
                    <Tab eventKey={EQUIPMENT_CONSTS.PRESETS} title="PRESETS">
                    </Tab>
                    <Tab eventKey={EQUIPMENT_CONSTS.ITEMS} title="ITEMS">
                    </Tab>
                    <Tab eventKey={EQUIPMENT_CONSTS.ABILITYS} title="ABILITYS">
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

Equipment.propTypes = {};

Equipment.defaultProps = {};

export default Equipment;
