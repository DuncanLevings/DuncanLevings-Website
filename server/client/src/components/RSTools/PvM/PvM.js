/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPvmType, getPvmTasks } from 'store/actions/RSTools/pvmActions';
import { clearPreset } from 'store/actions/RSTools/presetActions';
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
        this.props.getPvmTasks(PVM_CONSTS.SLAYER);
        this.props.getPvmTasks(PVM_CONSTS.BOSS);
        this.props.getPvmTasks(PVM_CONSTS.RAID);

        // default
        this.setDataType(PVM_CONSTS.SLAYER);

        if (this.props.presetReducer.savedPreset) this.props.clearPreset();
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
    setPvmType: PropTypes.func,
    getPvmTasks: PropTypes.func,
    presetReducer: PropTypes.object,
    clearPreset: PropTypes.func
};

const mapStateToProps = state => {
    return {
        presetReducer: state.presetReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ setPvmType, getPvmTasks, clearPreset }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PvM);