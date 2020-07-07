/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RESUME_ROUTES } from 'consts/Resume_Consts';
import { logoutUser } from 'store/actions/userActions';
import PropTypes from 'prop-types';
import './AdminDashResume.scss';
import { Container } from 'react-bootstrap';

class AdminDashResume extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    componentDidUpdate() {
        if (this.props.user) {
            const { isAdmin } = this.props.user;
            if (!isAdmin) this.props.logoutUser(RESUME_ROUTES.HOME);
        }
    }

    render() {
        return (
            <div className="AdminDashResume">
                <Container className="content">
                    <h1>component</h1>
                </Container>
            </div>
        );
    }
}

AdminDashResume.propTypes = {
    logoutUser: PropTypes.func,
    user: PropTypes.object
};

const mapStateToProps = state => {
    return {
        user: state.userReducer.user
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ logoutUser }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminDashResume));