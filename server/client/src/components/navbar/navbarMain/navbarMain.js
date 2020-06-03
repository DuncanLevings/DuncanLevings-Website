/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { isMobile } from 'react-device-detect';
import { RESUME_ROOT, RSTOOL_ROOT, NAVBAR_TYPE } from 'consts';
import { logoutUser } from 'store/actions/userActions';
import './navbarMain.scss';

class navbarMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    logout = () => {
        this.props.logoutUser();
    }

    scrollWidthOffset = el => {
        const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
        let yOffset = -60;
        if (isMobile) yOffset = -180;
        window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
    }

    renderNav = () => {
        const type = this.props.type;

        switch (type) {
            case NAVBAR_TYPE.RESUME:
                return (
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-3">
                            <NavHashLink 
                            to={"#aboutme"}
                            scroll={this.scrollWidthOffset}
                            >About Me</NavHashLink>
                        </Nav>
                        <Nav className="mr-3">
                            <NavHashLink 
                            to={"#education"}
                            scroll={this.scrollWidthOffset}
                            >Education</NavHashLink>
                        </Nav>
                        <Nav className="mr-3">
                            <NavHashLink 
                            to={"#experience"}
                            scroll={this.scrollWidthOffset}
                            >Experience</NavHashLink>
                        </Nav>
                        <Nav className="mr-3">
                            <NavHashLink 
                            to={"#projects"}
                            scroll={this.scrollWidthOffset}
                            >Projects</NavHashLink>
                        </Nav>
                        <Nav className="mr-3">
                            <NavHashLink 
                            to={"#contact"}
                            scroll={this.scrollWidthOffset}
                            >Contact Me</NavHashLink>
                        </Nav>
                    </Navbar.Collapse>
                );
            case NAVBAR_TYPE.RS_TOOLS:
                const { isAuthenticated } = this.props.userReducer;
                return (
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to={RSTOOL_ROOT} hidden={!isAuthenticated}>Home</Link>
                        </Nav>
                        <Nav>
                            <Button variant="primary" onClick={this.logout} hidden={!isAuthenticated}>Logout</Button>
                        </Nav>
                    </Navbar.Collapse>
                );
            default:
                break;
        }
    }

    render() {
        return (
            <Navbar bg="light" sticky="top" expand="lg">
                <Navbar.Brand>
                    <Link to={RESUME_ROOT}>
                        <img
                            src="/logo192.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Logo"
                        />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                {this.renderNav()}
            </Navbar>
        );
    }
}

navbarMain.propTypes = {
    logoutUser: PropTypes.func,
    userReducer: PropTypes.object
};

const mapStateToProps = state => {
    return {
        userReducer: state.userReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ logoutUser }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(navbarMain));
