/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { RESUME_ROUTES, RESUME_CRUD } from 'consts/Resume_Consts';
import { Container, ListGroup, Button, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlusSquare } from 'react-icons/fa';
import './AdminDashProjects.scss';

class AdminDashProjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [
                {
                    title: "test 1"
                },
                {
                    title: "test 2"
                },
                {
                    title: "test 3"
                }
            ]
        }
    }

    componentDidMount() {

    }

    navigate = (route, type) => {
        this.props.history.push({
            pathname: route,
            state: { type: type }
        });
    }

    setShowConfirm = (bool) => {
        this.setState({ showConfirm: bool });
        // set selected project
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
                    <p>Are you sure you wish to delete this project?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="button-secondary" onClick={() => this.setShowConfirm(false)}>Cancel</Button>
                    <Button variant="button-warning" onClick={() => this.setShowConfirm(false)}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    render() {
        return (
            <div className="AdminDashProjects">
                <Container className="content">
                    {this.confirmModal()}
                    <div className="button-header">
                        <Button variant="button-primary" className="add-project" onClick={() => this.navigate(RESUME_ROUTES.ADMIN_PROJECT, RESUME_CRUD.ADD)}><FaPlusSquare /> Add Project</Button>
                    </div>
                    <ListGroup variant="flush">
                        {this.state.projects.map((project, i) => {
                            return (
                                <ListGroup.Item key={i}>{project.title}
                                    <span className="actions">
                                        <FaEdit className="action-icon edit" onClick={() => this.navigate(RESUME_ROUTES.ADMIN_PROJECT, RESUME_CRUD.EDIT)} />
                                        <FaTrash className="action-icon delete" onClick={() => this.setShowConfirm(true)} />
                                    </span>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </Container>
            </div>
        );
    }
}

export default withRouter(AdminDashProjects);
