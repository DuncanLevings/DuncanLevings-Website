/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getActivities, deleteActivity } from 'store/actions/RSTools/activityActions';
import { Button, Col, Container, Form, FormControl, InputGroup, ListGroup, Modal, Row, Spinner } from 'react-bootstrap';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import PropTypes from 'prop-types';
import './Activity.scss';

class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            addActivityShow: false,
            showConfirm: false
        }
    }

    componentDidMount() {
        this.props.getActivities();
    }

    navigate = (route, bool = false, activityId = null) => {
        this.props.history.push({
            pathname: route,
            state: {
                editMode: bool,
                activityId: activityId
            }
        });
    }

    setShowConfirm = (bool, itemId = null) => {
        this.setState({
            showConfirm: bool,
            selectedActivityId: itemId ? itemId : this.state.selectedActivityId
        });
    }

    deleteActivity = () => {
        this.props.deleteActivity(this.state.selectedActivityId);
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
                    <p>Are you sure you wish to delete this activity?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="button-secondary" onClick={() => this.setShowConfirm(false)}>Cancel</Button>
                    <Button variant="button-warning" onClick={() => this.deleteActivity()}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    generateSearchResults = () => {
        const { search } = this.state;
        const { activities } = this.props.activityReducer;

        return activities
            .filter(activity => search === '' || activity.title.toLowerCase().includes(search.toLowerCase()))
            .map((activity, i) =>
                <ListGroup.Item key={i}>
                    <Row>
                        <Col xs={1}>
                            <span className="actions">
                                <FaEye className="action-icon view" size="1.5em" onClick={() => this.navigate(RSTOOL_ROUTES.ACTIVITY_VIEWER_PARAM + activity._id)} />
                            </span>
                        </Col>
                        <Col>{activity.title}</Col>
                        <Col>
                            <span className="actions">
                                <FaEdit className="action-icon edit" onClick={() => this.navigate(RSTOOL_ROUTES.ACTIVITY_BUILDER, true, activity._id)} />
                                <FaTrash className="action-icon delete" onClick={() => this.setShowConfirm(true, activity._id)} />
                            </span>
                        </Col>
                    </Row>
                </ListGroup.Item>
            );
    }

    render() {
        const { isFetching } = this.props.activityReducer;

        const searchResults = this.generateSearchResults();

        return (
            <Container>
                <div className="Activity">
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
                                    <Button variant="button-primary" onClick={() => this.navigate(RSTOOL_ROUTES.ACTIVITY_BUILDER)}>Add Activity</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                    <div className="spacer-h-3" />
                    {isFetching ?
                        <Spinner animation="border" variant="light" /> :
                        searchResults.length > 0 ?
                            <ListGroup variant="flush" className="scrollable-list">
                                {searchResults}
                            </ListGroup> :
                            <p>No activities found...</p>
                    }
                </div>
            </Container>
        );
    }
}

Activity.propTypes = {
    activityReducer: PropTypes.object,
    getActivities: PropTypes.func,
    deleteActivity: PropTypes.func
};

const mapStateToProps = state => {
    return {
        activityReducer: state.activityReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getActivities, deleteActivity }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Activity);