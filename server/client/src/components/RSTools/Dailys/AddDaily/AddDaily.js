/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Button, Container, Form, FormControl, InputGroup } from 'react-bootstrap';
import { ErrorMessage, Field, FieldArray, Formik } from 'formik';
import { dailySchema } from 'components/helpers/formValidation';
import PropTypes from 'prop-types';
import './AddDaily.scss';
import { FaPlus } from 'react-icons/fa';

class AddDaily extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    addStep = (field, values, setValues) => e => {
        const steps = [...values.steps];
        steps.push({ step: '', img: '' });
        setValues({ ...values, steps });
        field.onChange(e);
    }

    submitProject = values => {
        console.log(values)
        console.log(this.state)
    }

    render() {
        return (
            <Container>
                <div className="AddDaily">
                    <h1>Custom Daily</h1>
                    <div className="spacer-h-4" />
                    <div className="card-errors">
                        {/* {error} */}
                    </div>
                    <Formik
                        validationSchema={dailySchema}
                        onSubmit={this.submitProject}
                        initialValues={{
                            numberOfSteps: '1',
                            title: '',
                            steps: [{ step: '', img: '' }]
                        }}
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
                                                placeholder="Title of Daily"
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
                                    <FieldArray name="steps">
                                        {() => (values.steps.map((step, i) => {
                                            const stepErrors = (errors.steps?.length && errors.steps[i]) || {};
                                            const stepTouched = (touched.steps?.length && touched.steps[i]) || {};
                                            return (
                                                <div key={i} className="list-group list-group-flush">
                                                    <div className="list-group-item">
                                                        <div className="form-row">
                                                            <div className="form-group col-6">
                                                                <Field name={`steps.${i}.step`} type="text" className={'form-control' + (stepErrors.step && stepTouched.step ? ' is-invalid' : '')} />
                                                                <ErrorMessage name={`steps.${i}.step`} component="div" className="invalid-feedback" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }))}
                                    </FieldArray>
                                    <Form.Group controlId="formAddStep">
                                        <Field name="numberOfSteps">
                                            {({ field }) => (
                                                <Button {...field} className={'form-control' + (errors.numberOfSteps && touched.numberOfSteps ? ' is-invalid' : '')} variant="button-primary" onClick={this.addStep(field, values, setValues)}><FaPlus /> Add Step</Button>
                                            )}
                                        </Field>
                                        <ErrorMessage name="numberOfSteps" component="div" className="invalid-feedback" />
                                    </Form.Group>
                                    <hr className="divider" />
                                    <div className="daily-button">
                                        <Button
                                            variant="button-primary"
                                            type="submit"
                                            disabled={false}>Submit</Button>
                                    </div>
                                </Form>
                            )}
                    </Formik>
                </div>
            </Container>
        );
    }
}

AddDaily.propTypes = {};

AddDaily.defaultProps = {};

export default AddDaily;
