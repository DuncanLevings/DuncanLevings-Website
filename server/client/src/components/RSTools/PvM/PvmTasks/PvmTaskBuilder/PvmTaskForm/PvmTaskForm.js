/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPvmTask, editPvmTask } from 'store/actions/RSTools/pvmActions';
import { Button, Container, Form, FormControl, InputGroup, Spinner } from 'react-bootstrap';
import { pvmTaskSchema } from 'components/helpers/formValidation';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import './PvmTaskForm.scss';

class PvmTaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            presetMissing: false
        }
    }

    componentDidMount() {
    }

    previousStep = () => {
        this.props.setCurrentStep(this.props.currentStep - 1);
        this.props.previousStep();
    }

    getInitalValues = () => {
        if (this.props.editMode) {
            return {
                taskName: this.props.pvmTask.taskName || '',
                webURL: this.props.pvmTask.webURL || '',
                youtubeURL: this.props.pvmTask.youtubeURL || '',
                notes: this.props.pvmTask.notes || '',
            }
        }

        return {
            taskName: this.props.pvm.name || '',
            webURL: '',
            youtubeURL: '',
            notes: ''
        }
    }

    submit = values => {
        if (!this.props.preset) return this.setState({ presetMissing: true });
        this.setState({ presetMissing: false });

        let formData = new FormData();

        if (this.props.editMode) formData.append('pvmTaskId', this.props.pvmTask._id);
        else formData.append('pvm', JSON.stringify(this.props.pvm))
        formData.append('preset', JSON.stringify(this.props.preset));
        formData.append('taskName', values.taskName);
        formData.append('webURL', values.webURL);
        formData.append('youtubeURL', values.youtubeURL);
        formData.append('notes', values.notes);
        formData.append('type', this.props.pvmReducer.pvmType);

        if (this.props.editMode) {
            this.props.editPvmTask(formData);
        } else {
            this.props.createPvmTask(formData);
        }
    }

    render() {
        const { presetMissing } = this.state;
        const { isCreating, isSaving, error } = this.props.pvmReducer;

        return (
            <Container>
                <div className="PvmTaskForm">
                    <div className="step-button">
                        <Button variant="button-secondary" onClick={() => this.previousStep()}>Previous</Button>
                    </div>
                    <div className="submit-error">
                        <p>{error}</p>
                        {presetMissing ?
                            <p>Must setup a preset!</p>
                            : null}
                    </div>
                    {this.props.pvm || this.props.pvmTask ?
                        <div>
                            <h3>{this.props.pvm ? this.props.pvm.name : this.props.pvmTask.pvmName}</h3>
                            <div className="spacer-h-2" />
                            <Formik
                                validationSchema={pvmTaskSchema}
                                onSubmit={this.submit}
                                initialValues={this.getInitalValues()}
                            >
                                {({
                                    handleSubmit,
                                    handleChange,
                                    setValues,
                                    values,
                                    touched,
                                    errors
                                }) => (
                                        <Form noValidate onSubmit={handleSubmit}>
                                            <Form.Group controlId="formTaskName">
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Task Name:</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl
                                                        name="taskName"
                                                        placeholder="Task name..."
                                                        aria-label="taskName"
                                                        aria-describedby="taskName"
                                                        value={values.taskName}
                                                        onChange={handleChange}
                                                        isInvalid={touched.taskName && !!errors.taskName}
                                                        autoFocus
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.taskName}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group controlId="formWeb">
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Web Guide (optional):</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl
                                                        name="webURL"
                                                        placeholder="Web site url..."
                                                        aria-label="webURL"
                                                        aria-describedby="webURL"
                                                        value={values.webURL}
                                                        onChange={handleChange}
                                                        isInvalid={touched.webURL && !!errors.webURL}
                                                        autoFocus
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.webURL}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group controlId="formYoutube">
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Youtube Guide (optional):</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl
                                                        name="youtubeURL"
                                                        placeholder="Web site url..."
                                                        aria-label="youtubeURL"
                                                        aria-describedby="youtubeURL"
                                                        value={values.youtubeURL}
                                                        onChange={handleChange}
                                                        isInvalid={touched.youtubeURL && !!errors.youtubeURL}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.youtubeURL}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group controlId="formNotes">
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Notes (optional):</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl
                                                        as="textarea"
                                                        name="notes"
                                                        placeholder="Notes..."
                                                        aria-label="notes"
                                                        aria-describedby="notes"
                                                        value={values.notes}
                                                        onChange={handleChange}
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                            <div className="form-submit">
                                                <Button
                                                    variant="button-primary"
                                                    type="submit"
                                                    disabled={isCreating || isSaving}>Submit {isCreating || isSaving ? <Spinner animation="border" variant="light" size="sm" /> : null}</Button>
                                            </div>
                                        </Form>
                                    )}
                            </Formik>
                        </div>
                        : <Spinner animation="border" variant="light" />}
                </div>
            </Container>
        );
    }
}

PvmTaskForm.propTypes = {
    pvmReducer: PropTypes.object,
    createPvmTask: PropTypes.func,
    editPvmTask: PropTypes.func
};

const mapStateToProps = state => {
    return {
        pvmReducer: state.pvmReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ createPvmTask, editPvmTask }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PvmTaskForm);