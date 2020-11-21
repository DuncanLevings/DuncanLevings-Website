/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPvmTasks } from 'store/actions/RSTools/pvmActions';
import { Accordion, Button, Card, Container, Modal, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import PropTypes from 'prop-types';
import './PvmTasks.scss';

class PvmTasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    navigate = (route) => {
        this.props.history.push(route);
    }

    getData = () => {
        return [];
    }


    render() {
        const { pvmType, pvmTypeName, isFetching } = this.props.pvmReducer;
        let data = this.getData();

        return (
            <Container>
                <div className="PvmTasks">
                    <div className="button-header">
                        <Button variant="button-primary" className="add-task" onClick={() => this.navigate(RSTOOL_ROUTES.PVM_ENEMY_PARAM + pvmType)}><FaPlus /> Add {pvmTypeName} Task</Button>
                    </div>
                </div>
            </Container>
        );
    }
}

PvmTasks.propTypes = {
    getPvmTasks: PropTypes.func
};

const mapStateToProps = state => {
    return {
        pvmReducer: state.pvmReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getPvmTasks }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PvmTasks));