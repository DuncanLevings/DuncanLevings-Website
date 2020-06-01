/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
// import { RS } from 'constants/routeConstants';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { Formik } from 'formik';
import { FaEnvelope } from 'react-icons/fa';
import * as yup from 'yup';
// import PropTypes from 'prop-types';
import './ForgotPassword.scss';

const validationSchema = yup.object().shape({
    email: yup.string()
        .email("Must be a valid email address")
        .max(100, "*Email must be less than 100 characters")
        .required("*Email is required")
  });

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    sendReset = values => {
        console.log("sending email not implemented yet...");
    }

    render() {
        return (
            <div className="login">
                <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3>Forgot Password</h3>
                            </div>
                            <div className="card-body">
                                <Formik
                                    validationSchema={validationSchema}
                                    onSubmit={this.sendReset}
                                    initialValues={{
                                        email: ''
                                    }}
                                    >
                                    {({
                                        handleSubmit,
                                        handleChange,
                                        values,
                                        touched,
                                        errors
                                    }) => (
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <Form.Group controlId="formEmail">
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FaEnvelope/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl
                                                    type="email"
                                                    name="email"
                                                    placeholder="E-mail address"
                                                    aria-label="Email"
                                                    aria-describedby="Email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    isInvalid={touched.email && !!errors.email}
                                                    autoFocus
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.email}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                        <Button 
                                            variant="primary" 
                                            type="submit" 
                                            className="btn float-right login_btn">
                                                Submit
                                        </Button>
                                    </Form>
                                )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// ForgotPassword.propTypes = {};

// ForgotPassword.defaultProps = {};

export default ForgotPassword;
