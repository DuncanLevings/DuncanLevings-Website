/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Container, Button, ListGroup } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { FaPlusSquare, FaEdit, FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';
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
                    <div className="button-header">
                        {/* MAYBE DO DROPDOWN FILTER INSTEAD? could have main icon/ language/ tools as options */}
                        <BootstrapSwitchButton checked={false} onstyle="outline-success" offstyle="outline-secondary"/><span className="filter-text">Filter Main Icons</span>
                        <Button variant="button-primary" className="add-project"><FaPlusSquare /> Add Icon</Button>
                    </div>
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

AdminDashIcons.propTypes = {};

AdminDashIcons.defaultProps = {};

export default AdminDashIcons;
