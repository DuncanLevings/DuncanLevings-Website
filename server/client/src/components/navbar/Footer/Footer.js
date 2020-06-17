/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import './Footer.scss';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        // fetch last updated date here
    }

    render() {
        return (
            <div className="main-footer">
                <span>© 2020 by DuncanLevings <br /> Updated: June 17 2020</span>
            </div>
        );
    }
}

export default Footer;
