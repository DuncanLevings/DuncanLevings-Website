/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Accordion, Button, Card, Container, Modal, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { FaCheck, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import {
    getDaily,
    setDailyType,
    hideDaily,
    hideWeekly,
    hideMonthly,
    deleteDaily,
    deleteWeekly,
    deleteMonthly,
    completeDaily,
    completeWeekly,
    completeMonthly
} from 'store/actions/dailyActions';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import _ from "lodash";
import PropTypes from 'prop-types';
import './Daily.scss';

class Daily extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dailyIds: [],
            showDelete: false,
            showEdit: false,
            selectedDaily: null
        }
    }

    componentDidMount() {
    }

    navigate = (route) => {
        this.props.history.push(route);
    }

    setShowDelete = (bool, daily) => e => {
        e.stopPropagation();
        this.setState({
            showDelete: bool,
            selectedDaily: daily == undefined ? this.state.selectedDaily : daily
        });
    }

    deleteModal = () => {
        const { showDelete, selectedDaily } = this.state;
        const { user } = this.props.userReducer;

        let disableDelete = false;
        if (user && !user.isAdmin) {
            if (selectedDaily && selectedDaily.dailyId.publicDaily) {
                disableDelete = true;
            }
        }

        return (
            <Modal
                show={showDelete}
                onHide={() => this.setState({ showDelete: false })}
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="daily-modal text"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Hide or Delete</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="button-secondary" size="lg" onClick={() => this.hideDaily()}>Hide</Button>
                    {disableDelete ?
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Can only delete your own events.</Tooltip>}>
                            <span className="d-inline-block">
                                <Button variant="button-warning" size="sm" disabled style={{ pointerEvents: 'none' }}>
                                    Delete
                            </Button>
                            </span>
                        </OverlayTrigger>
                        :
                        <Button variant="button-warning" size="sm" onClick={() => this.deleteDaily()}>Delete</Button>
                    }
                </Modal.Footer>
            </Modal>
        );
    }

    hideDaily = () => {
        const { dailyType } = this.props.dailyReducer;
        const { selectedDaily } = this.state;

        if (dailyType === 0) {
            this.props.hideDaily(selectedDaily.dailyId._id);
        } else if (dailyType === 1) {
            this.props.hideWeekly(selectedDaily.dailyId._id);
        } else {
            this.props.hideMonthly(selectedDaily.dailyId._id);
        }

        this.setState({ showDelete: false });
    }

    deleteDaily = () => {
        const { dailyType } = this.props.dailyReducer;
        const { selectedDaily } = this.state;

        if (dailyType === 0) {
            this.props.deleteDaily(selectedDaily.dailyId._id);
        } else if (dailyType === 1) {
            this.props.deleteWeekly(selectedDaily.dailyId._id);
        } else {
            this.props.deleteMonthly(selectedDaily.dailyId._id);
        }

        this.setState({ showDelete: false });
    }

    setShowEdit = (bool, daily) => e => {
        e.stopPropagation();
        this.setState({
            showEdit: bool,
            selectedDaily: daily == undefined ? this.state.selectedDaily : daily
        });
    }

    editModal = () => {
        const { showEdit, selectedDaily } = this.state;
        const { user } = this.props.userReducer;

        let disableEdit = false;
        if (user && !user.isAdmin) {
            if (selectedDaily && selectedDaily.dailyId.publicDaily) {
                disableEdit = true;
            }
        }

        return (
            <Modal
                show={showEdit}
                onHide={() => this.setState({ showEdit: false })}
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="daily-modal text"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm edit</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    {disableEdit ?
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Can only edit your own events.</Tooltip>}>
                            <span className="d-inline-block">
                                <Button variant="button-secondary" disabled style={{ pointerEvents: 'none' }}>
                                    Edit
                                </Button>
                            </span>
                        </OverlayTrigger>
                        :
                        <Button variant="button-secondary" onClick={() => this.navigate(RSTOOL_ROUTES.EDITDAILY_PARAM + selectedDaily.dailyId._id)}>Edit</Button>
                    }
                    <Button variant="button-secondary" onClick={() => this.navigate(RSTOOL_ROUTES.EDITORDER)}>Change Order</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    markComplete = (daily) => e => {
        e.stopPropagation();
        this.setState(prevState => ({
            dailyIds: [...prevState.dailyIds, daily.dailyId._id]
        }), () => {
            this.setComplete(this.state.dailyIds)
        });
    }

    setComplete = _.debounce((dailyIds) => {
        const { dailyType } = this.props.dailyReducer;

        if (dailyType === 0) {
            this.props.completeDaily(dailyIds, dailyType);
        } else if (dailyType === 1) {
            this.props.completeWeekly(dailyIds, dailyType);
        } else {
            this.props.completeMonthly(dailyIds, dailyType);
        }

        //clear list after above executes
        this.setState({dailyIds: [] });
    }, 1500)

    render() {
        const { dailyTypeName, dailyType, dailys, weeklys, monthlys, isFetching } = this.props.dailyReducer;

        let data = [];
        if (dailyType === 0) {
            data = dailys;
        } else if (dailyType === 1) {
            data = weeklys;
        } else {
            data = monthlys;
        }

        return (
            <Container>
                <div className="Daily">
                    {this.deleteModal()}
                    {this.editModal()}
                    <div className="button-header">
                        <Button variant="button-primary" className="add-daily" onClick={() => this.navigate(RSTOOL_ROUTES.DAILYSEARCH)}><FaPlus /> Add {dailyTypeName}</Button>
                    </div>
                    {isFetching ? <Spinner animation="border" variant="light" /> : (
                        data.length > 0 ? (
                            data.map((daily, i) => {
                                var cardKey = i.toString();
                                var dailyData = daily.dailyId;
                                return (
                                    <Accordion key={i}>
                                        <Card>
                                            <Accordion.Toggle as={Card.Header} eventKey={cardKey}>
                                                <Button variant="button-primary" className="daily-complete" onClick={this.markComplete(daily)}><FaCheck /></Button>
                                                {dailyData.title}
                                                <span className="actions">
                                                    <FaEdit size="0.75em" className="action-icon edit" onClick={this.setShowEdit(true, daily)} />
                                                    <FaTrash size="0.75em" className="action-icon delete" onClick={this.setShowDelete(true, daily)} />
                                                </span>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey={cardKey}>
                                                <Card.Body>
                                                    {dailyData.steps.map((step, j) => {
                                                        return (
                                                            <div className="step-container" key={j}>
                                                                <Card.Text>
                                                                    <span className="step-number">{j + 1}.</span> {step.step}
                                                                </Card.Text>
                                                                {step.url ?
                                                                    <Card.Img src={step.url} />
                                                                    : null}
                                                            </div>
                                                        );
                                                    })}
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                );
                            })
                        ) :
                            <p>Completed all {dailyTypeName} for this reset!</p>
                    )}
                </div>
            </Container>
        );
    }
}

Daily.propTypes = {
    setDailyType: PropTypes.func,
    getDaily: PropTypes.func,
    hideDaily: PropTypes.func,
    hideWeekly: PropTypes.func,
    hideMonthly: PropTypes.func,
    deleteDaily: PropTypes.func,
    deleteWeekly: PropTypes.func,
    deleteMonthly: PropTypes.func,
    completeDaily: PropTypes.func,
    completeWeekly: PropTypes.func,
    completeMonthly: PropTypes.func,
    dailyReducer: PropTypes.object,
    userReducer: PropTypes.object
};

const mapStateToProps = state => {
    return {
        dailyReducer: state.dailyReducer,
        userReducer: state.userReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    setDailyType,
    getDaily,
    hideDaily,
    hideWeekly,
    hideMonthly,
    deleteDaily,
    deleteWeekly,
    deleteMonthly,
    completeDaily,
    completeWeekly,
    completeMonthly
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Daily));
