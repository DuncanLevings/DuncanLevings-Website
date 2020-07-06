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
import { RSTOOL_ROOT, NAVBAR_TYPE } from 'consts';
import { RESUME_ROUTES } from 'consts/Resume_Consts';
import { logoutUser } from 'store/actions/userActions';
import { updateActiveHash } from 'store/actions/navbarActions';
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

    setActivehash = val => {
        this.props.updateActiveHash(val);
    }

    isActiveClass = (hashRoute, hash) => {
        if (hashRoute === hash) return "is-active-link";
        return "";
    }

    scrollWidthOffset = el => {
        let top = el.getBoundingClientRect().top;
        const yCoordinate = top + window.pageYOffset;
        let yOffset = isMobile ? -327.81 : -77.81;

        if (top > 0 && top < (yOffset * -1)) {
            if (isMobile) this.setExpanded(false);
            return;
        }
        if (isMobile) this.setExpanded(false);

        window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
    }

    renderNav = () => {
        const { type } = this.props;

        switch (type) {
            case NAVBAR_TYPE.RESUME:
                const { hash } = this.props.navbarReducer;
                return (
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <NavHashLink 
                            to={RESUME_ROUTES.HASH_HOME}
                            activeClassName={this.isActiveClass(RESUME_ROUTES.HASH_HOME, hash)}
                            scroll={this.scrollWidthOffset}
                            onClick={() => this.setActivehash(RESUME_ROUTES.HASH_HOME)}
                        >
                            HOME
                        </NavHashLink>
                        <div className="ml-3 mr-3"/>
                        <NavHashLink 
                            to={RESUME_ROUTES.HASH_PROFESSIONAL}
                            activeClassName={this.isActiveClass(RESUME_ROUTES.HASH_PROFESSIONAL, hash)}
                            scroll={this.scrollWidthOffset}
                        >
                            PROFESSIONAL
                        </NavHashLink>
                        <div className="ml-3 mr-3"/>
                        <NavHashLink 
                            to={RESUME_ROUTES.HASH_EXPERIENCE}
                            activeClassName={this.isActiveClass(RESUME_ROUTES.HASH_EXPERIENCE, hash)}
                            scroll={this.scrollWidthOffset}
                        >
                            EXPERIENCE
                        </NavHashLink>
                        <div className="ml-3 mr-3"/>
                        <NavHashLink 
                            to={RESUME_ROUTES.HASH_PORTFOLIO}
                            activeClassName={this.isActiveClass(RESUME_ROUTES.HASH_PORTFOLIO, hash)}
                            scroll={this.scrollWidthOffset}
                        >
                            PORTFOLIO
                        </NavHashLink>
                        <div className="ml-3 mr-3"/>
                        <NavHashLink 
                            to={RESUME_ROUTES.HASH_CONTACT}
                            activeClassName={this.isActiveClass(RESUME_ROUTES.HASH_CONTACT, hash)}
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
                        to={RESUME_ROUTES.HASH_HOME} 
                        scroll={this.scrollWidthOffset}
                    >
                        <img
                            src="/static_images/DJL_Logo.png"
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
    updateActiveHash: PropTypes.func,
    userReducer: PropTypes.object,
    navbarReducer: PropTypes.object,
};

const mapStateToProps = state => {
    return {
        userReducer: state.userReducer,
        navbarReducer: state.navbarReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ logoutUser, updateActiveHash }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(navbarMain));
