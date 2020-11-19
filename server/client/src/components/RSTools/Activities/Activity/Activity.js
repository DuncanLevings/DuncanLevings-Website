/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getActivities } from 'store/actions/RSTools/activityActions';
import { Button, Col, Collapse, Container, Form, FormControl, Image, InputGroup, ListGroup, Modal, Row, Spinner } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './Activity.scss';

class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addActivityShow: false,
            showConfirm: false
        }
    }

    componentDidMount() {
        this.props.getActivities();
    }

    setAddActivityShow = (bool) => {
        this.setState({ addActivityShow: bool });
    }

    setShowConfirm = (bool, itemId = null) => {
        this.setState({
            showConfirm: bool,
            selectedItemId: itemId ? itemId : this.state.selectedItemId
        });
    }

    deleteActivity = () => {
        // this.props.deleteActivity(this.state.selectedItemId, this.state.filterSlots)
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
        return [];

        // .filter(item => search === '' || item.name.toLowerCase().includes(search.toLowerCase()))
        //     .map((item, i) =>
        //         <ListGroup.Item key={i}>
        //             <Row>
        //                 <Col xs={item.slot === 14 ? 4 : 1}><Image src={item.imageUrl} /></Col>
        //                 <Col xs={3}>{item.name}</Col>
        //                 <Col xs={2}>{EQUIPMENT_CONSTS.slotTypes[item.slot]}</Col>
        //                 <Col>
        //                     <span className="actions">
        //                         {item.isOwner ?
        //                             <>
        //                                 <FaEdit className="action-icon edit" onClick={() => this.setEditItemShow(true, item._id)} />
        //                                 <FaTrash className="action-icon delete" onClick={() => this.setShowConfirm(true, item._id)} />
        //                             </>
        //                             :
        //                             <>
        //                                 <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Can only edit items YOU made.</Tooltip>}>
        //                                     <span className="d-inline-block disabled-action">
        //                                         <FaEdit disabled style={{ pointerEvents: 'none' }} />
        //                                     </span>
        //                                 </OverlayTrigger>
        //                                 <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Can only delete items YOU made.</Tooltip>}>
        //                                     <span className="d-inline-block disabled-action">
        //                                         <FaTrash disabled style={{ pointerEvents: 'none' }} />
        //                                     </span>
        //                                 </OverlayTrigger>
        //                             </>
        //                         }
        //                     </span>
        //                 </Col>
        //             </Row>
        //         </ListGroup.Item>
        //     );
    }

    render() {

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
                                    <Button variant="button-primary" onClick={() => this.setAddActivityShow(true)}>Add Activity</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                    <div className="spacer-h-3" />
                    {false ?
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
    getActivities: PropTypes.func
};

const mapStateToProps = state => {
    return {
        activityReducer: state.activityReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getActivities }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Activity);