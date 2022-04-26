/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { LOGIN_TYPE } from 'consts';
import { Button } from 'react-bootstrap';
import { RESUME_ROUTES } from 'consts/Resume_Consts';
import { withRouter } from 'react-router-dom';
import './Footer.scss';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        // fetch last updated date here
    }

    navAdminLogin = () => {
        this.props.history.push(RESUME_ROUTES.LOGIN);
    }

    render() {
        const { type } = this.props;
        return (
            <div className="main-footer">
                <span>© 2020 by DuncanLevings <br /> Last Updated: Jan 02 2022</span>
                {type === LOGIN_TYPE.ADMIN ? (
                    <div className="admin-login">
                        <Button variant="button-secondary" onClick={() => this.navAdminLogin()}>Admin Login</Button>
                    </div>
                ) : (null)}
            </div>
        );
    }
}

export default withRouter(Footer);
