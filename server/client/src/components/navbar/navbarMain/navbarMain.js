/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { isMobile } from 'react-device-detect';
import { RESUME_ROOT, RSTOOL_ROOT, NAVBAR_TYPE } from 'consts';
import { RESUME_ROUTES } from 'consts/Resume_Consts';
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

    setExpanded = val => {
        this.setState({ expanded: val });
    }

    isActiveClass = (hash, emptyCheck = false) => {
        const location = this.props.location;

        if (emptyCheck) {
            if (location.hash === hash || location.hash === "")
                return "is-active-link";
        }

        if (location.hash === hash)
            return "is-active-link";
        return "";
    }

    scrollWidthOffset = el => {
        let yOffset = -77;

        if (isMobile) {
            yOffset = -330;
            this.setExpanded(false);
        }

        const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
    }

    renderNav = () => {
        const type = this.props.type;

        switch (type) {
            case NAVBAR_TYPE.RESUME:
                return (
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <NavHashLink 
                            to={RESUME_ROUTES.HASH_HOME}
                            activeClassName={this.isActiveClass(RESUME_ROUTES.HASH_HOME, true)}
                            scroll={this.scrollWidthOffset}
                        >
                            HOME
                        </NavHashLink>
                        <div className="ml-3 mr-3"/>
                        <NavHashLink 
                            to={RESUME_ROUTES.HASH_PROFESSIONAL}
                            activeClassName={this.isActiveClass(RESUME_ROUTES.HASH_PROFESSIONAL)}
                            scroll={this.scrollWidthOffset}
                        >
                            PROFESSIONAL
                        </NavHashLink>
                        <div className="ml-3 mr-3"/>
                        <NavHashLink 
                            to={RESUME_ROUTES.HASH_EXPERIENCE}
                            activeClassName={this.isActiveClass(RESUME_ROUTES.HASH_EXPERIENCE)}
                            scroll={this.scrollWidthOffset}
                        >
                            EXPERIENCE
                        </NavHashLink>
                        <div className="ml-3 mr-3"/>
                        <NavHashLink 
                            to={RESUME_ROUTES.HASH_PORTFOLIO}
                            activeClassName={this.isActiveClass(RESUME_ROUTES.HASH_PORTFOLIO)}
                            scroll={this.scrollWidthOffset}
                        >
                            PORTFOLIO
                        </NavHashLink>
                        <div className="ml-3 mr-3"/>
                        <NavHashLink 
                            to={RESUME_ROUTES.HASH_CONTACT}
                            activeClassName={this.isActiveClass(RESUME_ROUTES.HASH_CONTACT)}
                            scroll={this.scrollWidthOffset}
                        >
                            CONTACT
                        </NavHashLink>
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
        const { expanded } = this.state;
        return (
            <Navbar expanded={expanded} bg="dark" variant="light" sticky="top" expand="lg">
                <Navbar.Brand className="main-logo">
                    <NavHashLink 
                        to={RESUME_ROOT + RESUME_ROUTES.HASH_HOME} 
                        scroll={this.scrollWidthOffset}
                    >
                        <img
                            src="/DJL_Logo.png"
                            width="50"
                            height="50"
                            className="d-inline-block"
                            alt="Logo"
                        />
                    </NavHashLink>
                </Navbar.Brand>
                <div className="ml-4 mr-4"/>
                <Navbar.Toggle onClick={() => this.setExpanded(expanded ? false : "expanded")} aria-controls="responsive-navbar-nav" />
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
