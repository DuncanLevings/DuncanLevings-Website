/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { RESUME_ROOT, RUNESCAPE_ROOT } from 'constants/routeConstants';
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

    render() {
        const { isAuthenticated } = this.props.userReducer;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to={RESUME_ROOT}>Navbar</Link>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to={RUNESCAPE_ROOT} hidden={!isAuthenticated}>Home</Link>
                            </li>
                        </ul>
                        <Button variant="primary" type="submit" className="btn float-right" onClick={this.logout} hidden={!isAuthenticated}>Logout</Button>
                    </div>
                </nav>
            </div>
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
