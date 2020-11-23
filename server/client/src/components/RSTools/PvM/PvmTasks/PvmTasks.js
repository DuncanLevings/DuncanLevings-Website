/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPvmTasks, editPvmTask, deletePvmTask } from 'store/actions/RSTools/pvmActions';
import { Button, Col, Container, Form, FormControl, Image, InputGroup, ListGroup, Modal, Row, Spinner } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import PropTypes from 'prop-types';
import './PvmTasks.scss';

class PvmTasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            showConfirm: false
        }
    }

    componentDidMount() {
    }

    navigate = (route, state = null) => {
        this.props.history.push({
            pathname: route,
            state: state
        });
    }

    setSearch = e => {
        this.setState({ search: e.target.value });
    }

    setShowConfirm = (bool, taskId = null) => {
        this.setState({
            showConfirm: bool,
            selectedTaskId: taskId ? taskId : this.state.selectedTaskId
        });
    }

    deletePvmTask = () => {
        this.props.deletePvmTask(this.state.selectedTaskId, this.props.pvmReducer.pvmType);
        this.setState({ showConfirm: false });
    }

    confirmModal = () => {
        const { showConfirm } = this.state;

        return (
            <Modal
                show={showConfirm}
                onHide={() => this.setShowConfirm(false)}
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="confirm-modal text"
                centered
            >
                <Modal.Header>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you wish to delete this task?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="button-secondary" onClick={() => this.setShowConfirm(false)}>Cancel</Button>
                    <Button variant="button-warning" onClick={() => this.deletePvmTask()}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    getData = () => {
        const { search } = this.state;
        const { pvmType, pvmTasksSlayer, pvmTasksBoss, pvmTasksRaid } = this.props.pvmReducer;

        let searchData = [];
        switch (pvmType) {
            case 0:
                searchData = pvmTasksSlayer;
                break;
            case 1:
                searchData = pvmTasksBoss;
                break;
            case 2:
                searchData = pvmTasksRaid;
                break;
            default:
                break;
        }

        return searchData
            .filter(task => search === '' || task.taskName.toLowerCase().includes(search.toLowerCase()))
            .map((task, i) =>
                <ListGroup.Item key={i}>
                    <Row>
                        <Col xs={1}>
                            <FaEye className="action-icon view" size="1.5em" onClick={() => this.navigate(RSTOOL_ROUTES.PVM_TASK_VIEWER_PARAM + task._id)} />
                        </Col>
                        <Col xs={1}><Image src={task.thumbnailURL} /></Col>
                        <Col xs={6}>{task.taskName}</Col>
                        <Col><span className="actions">
                            <FaEdit className="action-icon edit" onClick={() => this.navigate(RSTOOL_ROUTES.PVM_TASK_BUILDER, {
                                editMode: true,
                                pvmTaskId: task._id
                            })} />
                            <FaTrash className="action-icon delete" onClick={() => this.setShowConfirm(true, task._id)} />
                        </span></Col>
                    </Row>
                </ListGroup.Item>
            );
    }

    render() {
        const { pvmType, pvmTypeName, isFetching, isSaving } = this.props.pvmReducer;

        let searchResults = this.getData();

        return (
            <Container>
                <div className="PvmTasks">
                    {this.confirmModal()}
                    <Form>
                        <Form.Group controlId="formSearch">
                            <InputGroup>
                                <FormControl
                                    placeholder="Search..."
                                    aria-label="search"
                                    aria-describedby="search"
                                    onChange={this.setSearch}
                                />
                                <InputGroup.Append>
                                    <Button variant="button-primary" className="add-task" onClick={() => this.navigate(RSTOOL_ROUTES.PVM_ENEMY_PARAM + pvmType)}><FaPlus /> Add {pvmTypeName} Task</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                    <div className="spacer-h-3" />
                    {isFetching || isSaving ?
                        <Spinner animation="border" variant="light" /> :
                        searchResults.length > 0 ?
                            <ListGroup variant="flush" className="scrollable-list">
                                {searchResults}
                            </ListGroup> :
                            <p>No {pvmTypeName} tasks found...</p>
                    }
                </div>
            </Container>
        );
    }
}

PvmTasks.propTypes = {
    getPvmTasks: PropTypes.func,
    editPvmTask: PropTypes.func,
    deletePvmTask: PropTypes.func
};

const mapStateToProps = state => {
    return {
        pvmReducer: state.pvmReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getPvmTasks, editPvmTask, deletePvmTask }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PvmTasks));