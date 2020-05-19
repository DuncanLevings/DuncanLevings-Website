/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import ***REMOVED*** withRouter ***REMOVED*** from "react-router";
import ***REMOVED*** Form, InputGroup, FormControl, Button ***REMOVED*** from 'react-bootstrap'
import ***REMOVED*** FaUser, FaKey ***REMOVED*** from 'react-icons/fa';
import ***REMOVED*** Formik ***REMOVED*** from 'formik';
import * as yup from 'yup';
import api from 'interceptors';
import PropTypes from 'prop-types';
import './Login.css';

const validationSchema = yup.object().shape(***REMOVED***
    email: yup.string()
        .email("Must be a valid email address")
        .max(100, "*Email must be less than 100 characters")
        .required("*Email is required"),
    password: yup.string()
        .min(4, "*Password must be at least 4 characters")
        .max(100, "*Password must be less than 100 characters")
        .required("*Password is required")
  ***REMOVED***);

class Login extends React.Component ***REMOVED***
    constructor() ***REMOVED***
        super();
        this.state = ***REMOVED***
            isSubmitting: false,
            errors: ""
        ***REMOVED***
    ***REMOVED***

    componentDidMount() ***REMOVED***
    //     api.get("/api/users")
    //     .then((data) => ***REMOVED***
    //        console.log(data);
    //    ***REMOVED***).catch(err => console.log(err.response.data));
    ***REMOVED***

    login = values => ***REMOVED***
        this.setState(***REMOVED***isSubmitting: true***REMOVED***);
        api.post("/api/users/login", values)
        .then((res) => ***REMOVED***
            this.props.history.push('/');
        ***REMOVED***)
        .catch((err) => ***REMOVED***
            this.setState(***REMOVED***errors: err.response.data, isSubmitting: false***REMOVED***);
        ***REMOVED***);
    ***REMOVED***

    render() ***REMOVED***
        const ***REMOVED*** isSubmitting, errors ***REMOVED*** = this.state;
        return (
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3>Sign In</h3>
                        </div>
                        <div className="card-body">
                            <div className="card-errors">
                                ***REMOVED***errors***REMOVED***
                            </div>
                            <Formik
                                validationSchema=***REMOVED***validationSchema***REMOVED***
                                onSubmit=***REMOVED***this.login***REMOVED***
                                initialValues=***REMOVED******REMOVED***
                                    email: '',
                                    password: '',
                                    remember_me: false
                                ***REMOVED******REMOVED***
                                >
                                ***REMOVED***(***REMOVED***
                                    handleSubmit,
                                    handleChange,
                                    values,
                                    touched,
                                    errors
                                ***REMOVED***) => (
                                <Form noValidate onSubmit=***REMOVED***handleSubmit***REMOVED***>
                                    <Form.Group controlId="formEmail">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><FaUser/></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                aria-label="Email"
                                                aria-describedby="Email"
                                                value=***REMOVED***values.email***REMOVED***
                                                onChange=***REMOVED***handleChange***REMOVED***
                                                isInvalid=***REMOVED***touched.email && !!errors.email***REMOVED***
                                                autoFocus
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                ***REMOVED***errors.email***REMOVED***
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="formPassword">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><FaKey/></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                aria-label="Password"
                                                aria-describedby="basic-addon1"
                                                value=***REMOVED***values.password***REMOVED***
                                                onChange=***REMOVED***handleChange***REMOVED***
                                                isInvalid=***REMOVED***touched.password && !!errors.password***REMOVED***
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                ***REMOVED***errors.password***REMOVED***
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="formRememberMe">
                                        <Form.Check
                                                type="checkbox"
                                                name="remember_me"
                                                label="Remember Me"
                                                className="remember"
                                                value=***REMOVED***values.remember_me***REMOVED***
                                                onChange=***REMOVED***handleChange***REMOVED***
                                                inline
                                            />
                                    </Form.Group>
                                    <Button 
                                        variant="primary" 
                                        type="submit" 
                                        className="btn float-right login_btn" 
                                        disabled=***REMOVED***isSubmitting***REMOVED***>Submit</Button>
                                </Form>
                            )***REMOVED***
                            </Formik>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Don't have an account?<a href="#">Sign Up</a>
                            </div>
                            <div className="d-flex justify-content-center">
                                <a href="#">Forgot your password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    ***REMOVED***
***REMOVED***

Login.propTypes = ***REMOVED******REMOVED***;

Login.defaultProps = ***REMOVED******REMOVED***;

export default withRouter(Login);
