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
import { getDaily, setDailyType, hideDaily, deleteDaily } from 'store/actions/dailyActions';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import PropTypes from 'prop-types';
import './Daily.scss';

class Daily extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDelete: false,
            showEdit: false,
            selectedDaily: null
        }
    }

    componentDidMount() {
        // retrieve dailys of type
        this.props.setDailyType(this.props.dailyType);
        this.props.getDaily(this.props.dailyType);

        localStorage.setItem("type", this.props.dailyType);
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
        const { selectedDaily } = this.state;
        this.props.hideDaily(selectedDaily.dailyId._id)
        this.setState({ showDelete: false });
    }

    deleteDaily = () => {
        const { selectedDaily } = this.state;
        this.props.deleteDaily(selectedDaily.dailyId._id)
        this.setState({ showDelete: false });
    }

    setShowEdit = (bool, i) => e => {
        e.stopPropagation();
        this.setState({ showEdit: bool });
    }

    editModal = () => {
        const { showEdit } = this.state;

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
                    <Button variant="button-secondary" onClick={this.setShowEdit(false)}>Edit</Button>
                    <Button variant="button-secondary" onClick={() => this.navigate(RSTOOL_ROUTES.EDITORDER)}>Change Order</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    markComplete = (key) => e => {
        e.stopPropagation();
        console.log(key)
        console.log("mark as done")
    }

    render() {
        const { dailyTypeName, dailys, isFetching } = this.props.dailyReducer;

        return (
            <Container>
                <div className="Daily">
                    {this.deleteModal()}
                    {this.editModal()}
                    <div className="button-header">
                        <Button variant="button-primary" className="add-daily" onClick={() => this.navigate(RSTOOL_ROUTES.DAILYSEARCH)}><FaPlus /> Add {dailyTypeName}</Button>
                    </div>
                    {isFetching ? <Spinner animation="border" variant="light" /> : (
                        dailys ? (
                            dailys.map((daily, i) => {
                                var cardKey = i.toString();
                                var dailyData = daily.dailyId;
                                return (
                                    <Accordion defaultActiveKey={daily.collapsed ? "" : cardKey} key={i}>
                                        <Card>
                                            <Accordion.Toggle as={Card.Header} eventKey={cardKey}>
                                                <Button variant="button-primary" className="daily-complete" onClick={this.markComplete(i)}><FaCheck /></Button>
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
                                                                    {j + 1}. {step.step}
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
                            <p>No data.</p>
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
    deleteDaily: PropTypes.func,
    dailyReducer: PropTypes.object,
    userReducer: PropTypes.object
};

const mapStateToProps = state => {
    return {
        dailyReducer: state.dailyReducer,
        userReducer: state.userReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ setDailyType, getDaily, hideDaily, deleteDaily }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Daily));
