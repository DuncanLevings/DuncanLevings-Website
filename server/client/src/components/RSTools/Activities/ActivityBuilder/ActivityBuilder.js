/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getActivitySingle } from 'store/actions/RSTools/activityActions';
import { Container } from 'react-bootstrap';
import PresetSelector from './PresetSelector/PresetSelector.lazy';
import ActivityForm from './ActivityForm/ActivityForm.lazy';
import Stepper from 'components/tools/Stepper/Stepper';
import StepWizard from 'react-step-wizard';
import PropTypes from 'prop-types';
import './ActivityBuilder.scss';

class ActivityBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activity: null,
            stepData: ['Preset', 'Activity'],
            step: 1,
            progress: 1,
            preset: null
        }
    }

    componentDidMount() {
        if (this.checkEditMode()) {
            this.props.getActivitySingle(this.props.location.state.activityId);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.activityReducer.activitySingle !== prevProps.activityReducer.activitySingle) {
            if (this.checkEditMode()) {
                this.setState({
                    activity: this.props.activityReducer.activitySingle,
                    preset: this.props.activityReducer.activitySingle.preset
                });
            }
        }
    }

    checkEditMode = () => {
        return this.props.location.state && this.props.location.state.editMode;
    }

    updatePreset = (preset) => {
        this.setState({ preset: preset });
    }

    setCurrentStep = (step) => {
        let progress = 0;
        switch (step) {
            case 2:
                progress = 100;
                break;
            default:
                break;
        }

        this.setState({
            step: step,
            progress: progress
        });
    }

    generateStepWizard = () => {
        const { preset, activity, step } = this.state;
        const { isFetchingSingle } = this.props.activityReducer;

        if (this.checkEditMode()) {
            if (isFetchingSingle || !activity) {
                return null;
            } else {
                const routeState = {
                    editMode: this.props.location.state.editMode || false,
                    activityId: this.props.location.state.activityId || null
                }

                return (
                    <StepWizard initialStep={step}>
                        <PresetSelector
                            editMode={true}
                            preset={preset}
                            routeState={routeState}
                            updatePreset={preset => this.updatePreset(preset)}
                            setCurrentStep={step => this.setCurrentStep(step)}
                        />
                        <ActivityForm
                            editMode={true}
                            activity={activity}
                            preset={preset}
                            setCurrentStep={step => this.setCurrentStep(step)}
                        />
                    </StepWizard>
                );
            }
        }

        return (
            <StepWizard initialStep={step}>
                <PresetSelector
                    updatePreset={preset => this.updatePreset(preset)}
                    setCurrentStep={step => this.setCurrentStep(step)}
                />
                <ActivityForm
                    preset={preset}
                    setCurrentStep={step => this.setCurrentStep(step)}
                />
            </StepWizard>
        );
    }

    render() {
        const { progress, stepData } = this.state;

        return (
            <Container>
                <div className="ActivityBuilder">
                    <div className='step-progress'>
                        <Stepper progress={progress} stepData={stepData} />
                        <div className="spacer-h-3" />
                        {this.generateStepWizard()}
                    </div>
                </div>
            </Container>
        );
    }
}

ActivityBuilder.propTypes = {
    activityReducer: PropTypes.object,
    getActivitySingle: PropTypes.func,
};

const mapStateToProps = state => {
    return {
        activityReducer: state.activityReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getActivitySingle }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ActivityBuilder);