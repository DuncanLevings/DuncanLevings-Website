/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import { DAILY_CONSTS } from 'consts/RSTools_Consts';
import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Daily from './Daily/Daily.lazy';
import './Dailys.scss';

class Dailys extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="Dailys">
                <Tabs defaultActiveKey="dailys" id="daily-dash">
                    <Tab eventKey="dailys" title="DAILY">
                        <Daily dailyType={DAILY_CONSTS.DAILY} />
                    </Tab>
                    <Tab eventKey="weeklys" title="WEEKLY">
                    </Tab>
                    <Tab eventKey="monthlys" title="MONTHLY">
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

Dailys.propTypes = {};

Dailys.defaultProps = {};

export default Dailys;
