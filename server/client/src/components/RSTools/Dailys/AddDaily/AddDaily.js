/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Button, Col, Container, Form, FormControl, InputGroup, ListGroup } from 'react-bootstrap';
import { ErrorMessage, Field, FieldArray, Formik } from 'formik';
import { dailySchema } from 'components/helpers/formValidation';
import PropTypes from 'prop-types';
import './AddDaily.scss';
import { FaImage, FaPlus, FaTrash } from 'react-icons/fa';

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

    removeStep = (i, field, values, setValues) => e => {
        var steps = [...values.steps];
        steps = steps.filter((_, index) => index !== i);
        setValues({ ...values, steps });
        field.onChange(e);
    }

    submitProject = values => {
        console.log(values)
    }

    render() {
        return (
            <Container>
                <div className="AddDaily">
                    <h1>Custom Daily</h1>
                    <div className="spacer-h-3" />
                    <Formik
                        validationSchema={dailySchema}
                        onSubmit={this.submitProject}
                        initialValues={{
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
                                    <hr className="divider" />
                                    <FieldArray name="steps">
                                        {() => (values.steps.map((step, i) => {
                                            const stepErrors = (errors.steps?.length && errors.steps[i]) || {};
                                            const stepTouched = (touched.steps?.length && touched.steps[i]) || {};
                                            return (
                                                <ListGroup variant="flush" key={i}>
                                                    <ListGroup.Item>
                                                        <Form.Row>
                                                            <Col>
                                                                <Form.Group>
                                                                    <InputGroup>
                                                                        <InputGroup.Prepend>
                                                                            <InputGroup.Text>Step {i + 1}:</InputGroup.Text>
                                                                        </InputGroup.Prepend>
                                                                        <Field name={`steps.${i}.step`} type="text" className={'form-control' + (stepErrors.step && stepTouched.step ? ' is-invalid' : '')} />
                                                                        <InputGroup.Append>
                                                                            <Button variant="button-secondary"><FaImage /> Add Image</Button>
                                                                            {i < 1 ?
                                                                                null :
                                                                                // <Button variant="button-warning-dull"  onClick={this.removeStep(i, values)}><FaTrash /> Remove Step</Button>
                                                                                <Field name="stepTotal">
                                                                                    {({ field }) => (
                                                                                        <Button {...field} variant="button-warning-dull" onClick={this.removeStep(i, field, values, setValues)}><FaTrash /> Remove Step</Button>
                                                                                    )}
                                                                                </Field>
                                                                            }
                                                                        </InputGroup.Append>
                                                                        <ErrorMessage name={`steps.${i}.step`} component="div" className="invalid-feedback" />
                                                                    </InputGroup>
                                                                </Form.Group>
                                                            </Col>
                                                        </Form.Row>
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            );
                                        }))}
                                    </FieldArray>
                                    <Form.Group controlId="formAddStep">
                                        <Field name="stepTotal">
                                            {({ field }) => (
                                                <Button {...field} variant="button-primary" onClick={this.addStep(field, values, setValues)}><FaPlus /> Add Step</Button>
                                            )}
                                        </Field>
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
