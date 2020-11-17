/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Container, Button, ListGroup, Row, Col } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { FaPlusSquare, FaEdit, FaTrash } from 'react-icons/fa';
// import PropTypes from 'prop-types';
import './AdminDashIcons.scss';

class AdminDashIcons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            icons: [
                {
                    text: "test",
                    icon: "a"
                },
                {
                    text: "test",
                    icon: "a"
                }
            ]
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="AdminDashIcons">
                <Container className="content">
                    <Row className="icon-row" noGutters>
                        <Col>
                            <span className="filter-text first">
                                Main
                            </span>
                            <BootstrapSwitchButton checked={false} onstyle="outline-success" offstyle="outline-secondary" />
                            <div className="small-newline" />
                            <span className="filter-text">
                                Languages
                            </span>
                            <BootstrapSwitchButton checked={true} onstyle="outline-success" offstyle="outline-secondary" />
                            <div className="small-newline" />
                            <span className="filter-text">
                                Tools
                            </span>
                            <BootstrapSwitchButton checked={true} onstyle="outline-success" offstyle="outline-secondary" />
                        </Col>
                        <Col className="icon-button-col">
                            <Button variant="button-primary" className="add-icon"><FaPlusSquare /> Add Icon</Button>
                        </Col>
                    </Row>
                    <Row className="small-icon-row">
                        <Col>
                            <Button variant="button-primary" className="add-icon"><FaPlusSquare /> Add Icon</Button>
                        </Col>
                    </Row>
                    <ListGroup variant="flush">
                        {this.state.icons.map((icon, i) => {
                            return (
                                <ListGroup.Item key={i}>{icon.text} <span className="actions"><FaEdit className="action-icon edit" /><FaTrash className="action-icon delete" /></span></ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </Container>
            </div>
        );
    }
}

// AdminDashIcons.propTypes = {};

// AdminDashIcons.defaultProps = {};

export default AdminDashIcons;
