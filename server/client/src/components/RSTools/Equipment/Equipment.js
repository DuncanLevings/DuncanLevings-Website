/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { EQUIPMENT_CONSTS } from 'consts/RSTools_Consts';
import Presets from './Presets/Presets.lazy';
import Items from './Item/Items/Items.lazy';
import Abilitys from './Ability/Abilitys/Abilitys.lazy';
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

    render() {
        return (
            <div className="Equipment">
                <Tabs defaultActiveKey={EQUIPMENT_CONSTS.types.PRESETS} id="equipment-dash" onSelect={this.handleSelect}>
                    <Tab eventKey={EQUIPMENT_CONSTS.types.PRESETS} title="PRESETS">
                        <Presets />
                    </Tab>
                    <Tab eventKey={EQUIPMENT_CONSTS.types.ITEMS} title="ITEMS">
                        <Items />
                    </Tab>
                    <Tab eventKey={EQUIPMENT_CONSTS.types.ABILITYS} title="ABILITYS">
                        <Abilitys />
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

Equipment.propTypes = {};

Equipment.defaultProps = {};

export default Equipment;
