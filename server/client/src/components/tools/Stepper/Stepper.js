/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import './stepper.scss';

class Stepper extends React.Component {
    render() {
        const { progress, stepData } = this.props;

        const steps = stepData.map((step, i) =>
            <Step key={i}>
                {({ accomplished }) => (
                    <div className="container-check" style={{
                        color: `${accomplished ? "#00bd3d" : "#949eaa88"}`,
                        borderColor: `${accomplished ? "#00bd3d" : "#949eaa88"}`
                    }}>
                        <div className="stepper-check">
                            <span className="stepper-icon">{i + 1}</span>
                        </div>
                        <p className="stepper-text">{step}</p>
                    </div>
                )}
            </Step>
        );

        return (
            <ProgressBar percent={progress}>
                {steps}
            </ProgressBar>
        );
    }
}

export default Stepper;