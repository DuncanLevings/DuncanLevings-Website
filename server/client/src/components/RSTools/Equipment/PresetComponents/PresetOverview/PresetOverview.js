/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Button, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './PresetOverview.scss';

class PresetOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    previousStep = () => {
        this.props.setCurrentStep(this.props.currentStep - 1);
        this.props.previousStep();
    }

    render() {
        return (
            <Container>
                <div className="PresetOverview">
                    <div className="step-button">
                        <Button variant="button-secondary" onClick={() => this.previousStep()}>Previous</Button>
                    </div>
                </div>
            </Container>
        );
    }
}

PresetOverview.propTypes = {
    setCurrentStep: PropTypes.func
};

PresetOverview.defaultProps = {};

export default PresetOverview;
