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
        let yOffset = -80;
        if (isMobile) yOffset = -180;
        window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
    }

    renderNav = () => {
        const type = this.props.type;
        const location = this.props.location;

        switch (type) {
            case NAVBAR_TYPE.RESUME:
                return (
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <NavHashLink 
                        to={"#home"}
                        activeClassName={`${location.hash}` === "#home" ? "is-active-link" : ""}
                        scroll={this.scrollWidthOffset}
                        >HOME</NavHashLink>
                        <div className="ml-3 mr-3 bordered"/>
                        <NavHashLink 
                        to={"#education"}
                        activeClassName={`${location.hash}` === "#education" ? "is-active-link" : ""}
                        scroll={this.scrollWidthOffset}
                        >PROFESSIONAL</NavHashLink>
                        <div className="ml-3 mr-3 bordered"/>
                        <NavHashLink 
                        to={"#experience"}
                        activeClassName={`${location.hash}` === "#experience" ? "is-active-link" : ""}
                        scroll={this.scrollWidthOffset}
                        >EXPERIENCE</NavHashLink>
                        <div className="ml-3 mr-3 bordered"/>
                        <NavHashLink 
                        to={"#projects"}
                        activeClassName={`${location.hash}` === "#projects" ? "is-active-link" : ""}
                        scroll={this.scrollWidthOffset}
                        >PORTFOLIO</NavHashLink>
                        <div className="ml-3 mr-3 bordered"/>
                        <NavHashLink 
                        to={"#contact"}
                        activeClassName={`${location.hash}` === "#contact" ? "is-active-link" : ""}
                        scroll={this.scrollWidthOffset}
                        >CONTACT</NavHashLink>
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
                            <Button variant="button-primary" onClick={this.logout} hidden={!isAuthenticated}>Logout</Button>
                        </Nav>
                    </Navbar.Collapse>
                );
            default:
                break;
        }
    }

    render() {
        return (
            <Navbar bg="dark" variant="light" sticky="top" expand="lg">
                <Navbar.Brand className="main-logo">
                    <Link to={RESUME_ROOT}>
                        <img
                            src="/DJL_Logo.png"
                            width="50"
                            height="50"
                            className="d-inline-block"
                            alt="Logo"
                        />
                    </Link>
                </Navbar.Brand>
                <div className="ml-4 mr-4"/>
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
