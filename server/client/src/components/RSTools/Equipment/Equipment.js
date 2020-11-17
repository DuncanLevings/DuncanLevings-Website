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
import './Equipment.scss';

class Equipment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="Equipment">
                <Tabs defaultActiveKey={EQUIPMENT_CONSTS.types.PRESETS} id="equipment-dash">
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

export default Equipment;
