/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createActivity, editActivity } from 'store/actions/RSTools/activityActions';
import { Button, Container, Form, FormControl, InputGroup, Spinner } from 'react-bootstrap';
import { activitySchema } from 'components/helpers/formValidation';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import './ActivityForm.scss';

class ActivityForm extends React.Component {
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
                title: this.props.activity.title || '',
                webURL: this.props.activity.webURL || '',
                youtubeURL: this.props.activity.youtubeURL || '',
                notes: this.props.activity.notes || '',
            }
        }
        
        return {
            title: '',
            webURL: '',
            youtubeURL: '',
            notes: ''
        }
    }

    submit = values => {
        if (!this.props.preset) return this.setState({ presetMissing: true });
        this.setState({ presetMissing: false });

        let formData = new FormData();

        if (this.props.editMode) formData.append('activityId', this.props.activity._id);
        formData.append('preset', JSON.stringify(this.props.preset));
        formData.append('title', values.title);
        formData.append('webURL', values.webURL);
        formData.append('youtubeURL', values.youtubeURL);
        formData.append('notes', values.notes);

        if (this.props.editMode) {
            this.props.editActivity(formData);
        } else {
            this.props.createActivity(formData);
        }
    }

    render() {
        const { presetMissing } = this.state;
        const { isCreating, isSaving, error } = this.props.activityReducer;

        return (
            <Container>
                <div className="ActivityForm">
                    <div className="step-button">
                        <Button variant="button-secondary" onClick={() => this.previousStep()}>Previous</Button>
                    </div>
                    <div className="activity-error">
                        <p>{error}</p>
                        {presetMissing ?
                            <p>Must setup a preset!</p>
                            : null}
                    </div>
                    <Formik
                        validationSchema={activitySchema}
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
                                    <Form.Group controlId="formTitle">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Title:</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                name="title"
                                                placeholder="Title"
                                                aria-label="Title"
                                                aria-describedby="Title"
                                                value={values.title}
                                                onChange={handleChange}
                                                isInvalid={touched.title && !!errors.title}
                                                autoFocus
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.title}
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
            </Container>
        );
    }
}

ActivityForm.propTypes = {
    activityReducer: PropTypes.object,
    createActivity: PropTypes.func,
    editActivity: PropTypes.func
};

const mapStateToProps = state => {
    return {
        activityReducer: state.activityReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ createActivity, editActivity }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ActivityForm);