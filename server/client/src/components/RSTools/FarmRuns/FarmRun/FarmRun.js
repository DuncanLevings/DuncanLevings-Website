/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { FARM_CONSTS, RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import { FaEdit, FaPlus } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './FarmRun.scss';

class FarmRun extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            farmType: -1
        }
    }

    componentDidMount() {
        if (this.checkFarmType()) {
            this.setState({ farmType: this.props.location.state.farmType });
            // this.props.getFarmRun(this.props.location.state.farmType)
        }
    }

    navigate = (route) => {
        this.props.history.push(route);
    }

    checkFarmType = () => {
        return this.props.location.state && this.props.location.state.farmType > -1;
    }

    render() {
        const { farmType } = this.state;
        // const { farmRun } = this.props.farmRunReducer;
        let farmRun = false; //temp

        return (
            <Container>
                <div className="FarmRun">
                    <div className="farm-header">
                        <h3>{FARM_CONSTS.farmTypeNames[farmType]}</h3>
                        {farmRun ?
                            <Button variant="button-primary" className="edit" ><FaEdit /> Edit</Button>
                            :
                            <Button variant="button-primary" className="edit" onClick={() => this.navigate(RSTOOL_ROUTES.FARMRUN_BUILDER_PARAM + farmType)}><FaPlus /> Create</Button>
                        }
                    </div>
                </div>
            </Container>
        );
    }
}

FarmRun.propTypes = {};

FarmRun.defaultProps = {};

export default withRouter(FarmRun);
