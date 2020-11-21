/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPvmType } from 'store/actions/RSTools/pvmActions';
import { Tab, Tabs } from 'react-bootstrap';
import { PVM_CONSTS } from 'consts/RSTools_Consts';
import PvmTasks from './PvmTasks/PvmTasks.lazy';
import PropTypes from 'prop-types';
import './PvM.scss';

class PvM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        // this.props.getDaily(DAILY_CONSTS.DAILY);
        // this.props.getWeekly(DAILY_CONSTS.WEEKLY);
        // this.props.getMonthly(DAILY_CONSTS.MONTHLY);

        // default
        this.setDataType(PVM_CONSTS.SLAYER);
    }

    handleSelect = key => {
        switch (parseInt(key)) {
            case PVM_CONSTS.SLAYER:
                this.setDataType(PVM_CONSTS.SLAYER);
                break;
            case PVM_CONSTS.BOSS:
                this.setDataType(PVM_CONSTS.BOSS);
                break;
            case PVM_CONSTS.RAID:
                this.setDataType(PVM_CONSTS.RAID);
                break;
            default:
                break;
        }
    }

    setDataType = (type) => {
        this.props.setPvmType(type);
        localStorage.setItem("pvmType", type);
    }

    render() {
        return (
            <div className="PvM">
                <Tabs defaultActiveKey={PVM_CONSTS.SLAYER} id="pvm-dash" onSelect={this.handleSelect}>
                    <Tab eventKey={PVM_CONSTS.SLAYER} title="SLAYER">
                        <PvmTasks />
                    </Tab>
                    <Tab eventKey={PVM_CONSTS.BOSS} title="BOSSING">
                        <PvmTasks />
                    </Tab>
                    <Tab eventKey={PVM_CONSTS.RAID} title="RAIDS">
                        <PvmTasks />
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

PvM.propTypes = {
    setPvmType: PropTypes.func
};

const mapDispatchToProps = dispatch => bindActionCreators({ setPvmType }, dispatch);

export default connect(null, mapDispatchToProps)(PvM);