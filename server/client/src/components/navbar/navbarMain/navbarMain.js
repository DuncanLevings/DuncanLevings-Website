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
import { withRouter, NavLink } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { isMobile } from 'react-device-detect';
import { NAVBAR_TYPE } from 'consts';
import { RESUME_ROUTES } from 'consts/Resume_Consts';
import { logoutUser } from 'store/actions/userActions';
import { updateActiveHash } from 'store/actions/navbarActions';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import './navbarMain.scss';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

class navbarMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    logout = (redirect) => {
        this.props.logoutUser(redirect);
    }

    setExpanded = val => {
        this.setState({ expanded: val });
    }

    setActivehash = val => {
        this.props.updateActiveHash(val);
    }

    isActiveClass = (hashRoute, hash) => {
        if (hash.includes(hashRoute)) return "is-active-link";
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
        const { isAuthenticated } = this.props.userReducer;

        var isAdmin = false;
        if (this.props.userReducer.user)
            isAdmin = this.props.userReducer.user.isAdmin;

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
                        <div className="ml-3 mr-3" />
                        <NavHashLink
                            to={RESUME_ROUTES.HASH_PROFESSIONAL}
                            activeClassName={this.isActiveClass(RESUME_ROUTES.HASH_PROFESSIONAL, hash)}
                            scroll={this.scrollWidthOffset}
                        >
                            PROFESSIONAL
                        </NavHashLink>
                        <div className="ml-3 mr-3" />
                        <NavHashLink
                            to={RESUME_ROUTES.HASH_EXPERIENCE}
                            activeClassName={this.isActiveClass(RESUME_ROUTES.HASH_EXPERIENCE, hash)}
                            scroll={this.scrollWidthOffset}
                        >
                            EXPERIENCE
                        </NavHashLink>
                        <div className="ml-3 mr-3" />
                        <NavHashLink
                            to={RESUME_ROUTES.HASH_PORTFOLIO}
                            activeClassName={this.isActiveClass(RESUME_ROUTES.HASH_PORTFOLIO, hash)}
                            scroll={this.scrollWidthOffset}
                        >
                            PORTFOLIO
                        </NavHashLink>
                        <div className="ml-3 mr-3" />
                        <NavHashLink
                            to={RESUME_ROUTES.HASH_CONTACT}
                            activeClassName={this.isActiveClass(RESUME_ROUTES.HASH_CONTACT, hash)}
                            scroll={this.scrollWidthOffset}
                        >
                            CONTACT
                        </NavHashLink>
                        <div className="ml-3 mr-3" />
                        <a className="custom-icon-link" href="https://www.linkedin.com/in/duncan-levings/" target="_blank" rel="noopener noreferrer"><FaLinkedin size={30}/></a>
                        <div className="ml-3 mr-3" />
                        <a className="custom-icon-link" href="https://github.com/DuncanLevings/PersonalWork" target="_blank" rel="noopener noreferrer"><FaGithub size={30}/></a>
                        {isAdmin ? (
                            <>
                                <div className="ml-3 mr-3" />
                                <NavLink
                                    to={RESUME_ROUTES.ADMIN_DASH}
                                    activeClassName={this.isActiveClass(RESUME_ROUTES.ADMIN_DASH, hash)}
                                >
                                    DASH
                                </NavLink>
                                <div className="navbar-logout">
                                    <Button variant="button-primary" onClick={() => this.logout(RESUME_ROUTES.HOME)} hidden={!isAdmin}>Logout</Button>
                                </div>
                            </>
                        ) : (null)}
                    </Navbar.Collapse>
                );
            case NAVBAR_TYPE.RS_TOOLS:
                const { pathname } = this.props.location;
                return (
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            <NavLink activeClassName={this.isActiveClass(RSTOOL_ROUTES.DAILYS, pathname)} to={RSTOOL_ROUTES.DAILYS} hidden={!isAuthenticated}>DAILYS</NavLink >
                        </Nav>
                        <div className="ml-3 mr-3" />
                        <Nav>
                            <NavLink activeClassName={this.isActiveClass(RSTOOL_ROUTES.FARMRUNS, pathname)} to={RSTOOL_ROUTES.FARMRUNS} hidden={!isAuthenticated}>FARM RUNS</NavLink>
                        </Nav>
                        <div className="ml-3 mr-3" />
                        <Nav>
                            <NavLink activeClassName={this.isActiveClass(RSTOOL_ROUTES.PVM, pathname)} to={RSTOOL_ROUTES.PVM} hidden={!isAuthenticated}>PVM</NavLink>
                        </Nav>
                        <div className="ml-3 mr-3" />
                        <Nav>
                            <NavLink activeClassName={this.isActiveClass(RSTOOL_ROUTES.ACTIVITIES, pathname)} to={RSTOOL_ROUTES.ACTIVITIES} hidden={!isAuthenticated}>ACTIVITIES</NavLink>
                        </Nav>
                        <div className="ml-3 mr-3" />
                        <Nav>
                            <NavLink activeClassName={this.isActiveClass(RSTOOL_ROUTES.EQUIPMENT, pathname)} to={RSTOOL_ROUTES.EQUIPMENT} hidden={!isAuthenticated}>EQUIPMENT</NavLink>
                        </Nav>
                        <div className="ml-3 mr-3" />
                        <Nav>
                            <NavLink activeClassName={this.isActiveClass(RSTOOL_ROUTES.BRONZE_MAN, pathname)} to={RSTOOL_ROUTES.BRONZE_MAN} hidden={!isAuthenticated}>BRONZE MAN</NavLink>
                        </Nav>
                        <Nav className="ml-auto">
                            <Button variant="button-primary" onClick={() => this.logout(RSTOOL_ROUTES.LOGIN)} hidden={!isAuthenticated}>Logout</Button>
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
                <div className="ml-4 mr-4" />
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
