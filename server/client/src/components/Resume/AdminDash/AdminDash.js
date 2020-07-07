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
import { updateActiveHash } from 'store/actions/navbarActions';
import { logoutUser } from 'store/actions/userActions';
import { Container, CardDeck, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './AdminDash.scss';

class ResumeAdminDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.updateActiveHash(RESUME_ROUTES.ADMIN_DASH);
    }

    componentDidUpdate() {
        if (this.props.user) {
            const { isAdmin } = this.props.user;
            if (!isAdmin) this.props.logoutUser(RESUME_ROUTES.HOME);
        }
    }

    navigate = (route) => {
        this.props.history.push(route);
    }

    render() {
        return (
            <div className="ResumeAdminDash">
                <Container className="content">
                    <CardDeck>
                        <Card className="portfolio-card" onClick={() => this.navigate(RESUME_ROUTES.ADMIN_RESUME) }>
                            <Card.Body className="main-body">
                                <Card.Title>Resume</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className="portfolio-card" onClick={() => this.navigate(RESUME_ROUTES.ADMIN_PORTFOLIO) }>
                            <Card.Body className="main-body">
                                <Card.Title>Portfolio</Card.Title>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                </Container>
            </div>
        );
    }
}

ResumeAdminDash.propTypes = {
    updateActiveHash: PropTypes.func,
    logoutUser: PropTypes.func,
    user: PropTypes.object
};

const mapStateToProps = state => {
    return {
        user: state.userReducer.user
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ logoutUser, updateActiveHash }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResumeAdminDash));
