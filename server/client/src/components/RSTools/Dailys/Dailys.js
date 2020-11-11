/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkReset, setRefresh, getDaily, getWeekly, getMonthly, setDailyType } from 'store/actions/RSTools/dailyActions';
import { Tab, Tabs } from 'react-bootstrap';
import { DAILY_CONSTS } from 'consts/RSTools_Consts';
import Daily from './Daily/Daily.lazy';
import PropTypes from 'prop-types';
import './Dailys.scss';

class Dailys extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.checkReset();
        this.props.getDaily(DAILY_CONSTS.DAILY);
        this.props.getWeekly(DAILY_CONSTS.WEEKLY);
        this.props.getMonthly(DAILY_CONSTS.MONTHLY);

        // default
        this.setDataType(DAILY_CONSTS.DAILY);
    }

    componentDidUpdate(prevProps) {
        if (this.props.dailyReducer.refresh !== prevProps.dailyReducer.refresh) {
            // fetch new data
            this.props.getDaily(DAILY_CONSTS.DAILY);
            this.props.getWeekly(DAILY_CONSTS.WEEKLY);
            this.props.getMonthly(DAILY_CONSTS.MONTHLY);

            // reset refresh to false
            this.props.setRefresh(false);
        }
    }

    handleSelect = key => {
        switch (parseInt(key)) {
            case DAILY_CONSTS.DAILY:
                this.setDataType(DAILY_CONSTS.DAILY);
                break;
            case DAILY_CONSTS.WEEKLY:
                this.setDataType(DAILY_CONSTS.WEEKLY);
                break;
            case DAILY_CONSTS.MONTHLY:
                this.setDataType(DAILY_CONSTS.MONTHLY);
                break;
            default:
                break;
        }
    }

    setDataType = (type) => {
        this.props.setDailyType(type);
        localStorage.setItem("type", type);
    }

    render() {
        return (
            <div className="Dailys">
                <Tabs defaultActiveKey={DAILY_CONSTS.DAILY} id="daily-dash" onSelect={this.handleSelect}>
                    <Tab eventKey={DAILY_CONSTS.DAILY} title="DAILY">
                        <Daily />
                    </Tab>
                    <Tab eventKey={DAILY_CONSTS.WEEKLY} title="WEEKLY">
                        <Daily />
                    </Tab>
                    <Tab eventKey={DAILY_CONSTS.MONTHLY} title="MONTHLY">
                        <Daily />
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

Dailys.propTypes = {
    setDailyType: PropTypes.func,
    setRefresh: PropTypes.func,
    checkReset: PropTypes.func,
    getDaily: PropTypes.func,
    getWeekly: PropTypes.func,
    getMonthly: PropTypes.func
};

const mapStateToProps = state => {
    return {
        dailyReducer: state.dailyReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ checkReset, setRefresh, setDailyType, getDaily, getWeekly, getMonthly }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dailys);