/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPvmType, getPvmSingle, getPvmTaskSingle } from 'store/actions/RSTools/pvmActions';
import { Container } from 'react-bootstrap';
import PresetSelector from 'components/RSTools/Activities/ActivityBuilder/PresetSelector/PresetSelector.lazy';
import PvmTaskForm from './PvmTaskForm/PvmTaskForm.lazy';
import Stepper from 'components/tools/Stepper/Stepper';
import StepWizard from 'react-step-wizard';
import PropTypes from 'prop-types';
import './PvmTaskBuilder.scss';

class PvmTaskBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pvmTask: null,
            pvm: null,
            preset: null,
            stepData: ['Preset', 'PvM Task'],
            step: 1,
            progress: 1
        }
    }

    componentDidMount() {
        if (this.checkNewTask()) {
            this.props.getPvmSingle(this.props.location.state.pvmId);
        }

        if (this.checkEditMode()) {
            this.props.getPvmTaskSingle(this.props.location.state.pvmTaskId);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.pvmReducer.pvmSingle !== prevProps.pvmReducer.pvmSingle) {
            if (this.checkNewTask()) {
                this.setState({
                    pvm: this.props.pvmReducer.pvmSingle
                });
            }
        }

        if (this.props.pvmReducer.pvmTaskSingle !== prevProps.pvmReducer.pvmTaskSingle) {
            if (this.checkEditMode()) {
                this.setState({
                    pvmTask: this.props.pvmReducer.pvmTaskSingle,
                    preset: this.props.pvmReducer.pvmTaskSingle.preset
                });
            }
        }
    }

    checkNewTask = () => {
        return this.props.location.state && this.props.location.state.newTask;
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
        const { pvmTask, pvm, preset, step } = this.state;
        const { isFetching } = this.props.pvmReducer;

        if (this.checkEditMode()) {
            if (isFetching || !pvmTask) {
                return null;
            } else {
                const routeState = {
                    editMode: this.props.location.state.editMode || false,
                    pvmTaskId: this.props.location.state.pvmTaskId || null
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
                        <PvmTaskForm
                            editMode={true}
                            pvmTask={pvmTask}
                            preset={preset}
                            setCurrentStep={step => this.setCurrentStep(step)}
                        />
                    </StepWizard>
                );
            }
        }

        if (isFetching) return null;

        return (
            <StepWizard initialStep={step}>
                <PresetSelector
                    updatePreset={preset => this.updatePreset(preset)}
                    setCurrentStep={step => this.setCurrentStep(step)}
                />
                <PvmTaskForm
                    pvm={pvm}
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
                <div className="PvmTaskBuilder">
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

PvmTaskBuilder.propTypes = {
    pvmReducer: PropTypes.object,
    setPvmType: PropTypes.func,
    getPvmSingle: PropTypes.func,
    getPvmTaskSingle: PropTypes.func
};

const mapStateToProps = state => {
    return {
        pvmReducer: state.pvmReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ setPvmType, getPvmSingle, getPvmTaskSingle }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PvmTaskBuilder);