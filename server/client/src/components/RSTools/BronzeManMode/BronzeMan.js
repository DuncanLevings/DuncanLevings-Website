/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tab, Tabs } from 'react-bootstrap';
import { BRONZE_MAN_CONSTS } from 'consts/RSTools_Consts';
import BronzeManMode from './BronzeManMode/BronzeManMode.lazy';
import BronzeManEnemy from './BronzeManEnemy/BronzeManEnemy.lazy';
import PropTypes from 'prop-types';
import './BronzeMan.scss';

class BronzeMan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="BronzeMan">
                <Tabs defaultActiveKey={BRONZE_MAN_CONSTS.BRONZE_MAN_ITEM} id="bronze-man-dash" onSelect={this.handleSelect}>
                    <Tab eventKey={BRONZE_MAN_CONSTS.BRONZE_MAN_ITEM} title="ITEMS">
                        <BronzeManMode />
                    </Tab>
                    <Tab eventKey={BRONZE_MAN_CONSTS.BRONZE_MAN_ENEMY} title="ENEMIES">
                        <BronzeManEnemy />
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

BronzeMan.propTypes = {}

const mapStateToProps = state => {
    return {};
}

const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BronzeMan);