/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import ***REMOVED*** withRouter, Link ***REMOVED*** from 'react-router-dom';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** bindActionCreators ***REMOVED*** from 'redux';
import ***REMOVED*** signupUser ***REMOVED*** from 'store/actions/userActions';
import ***REMOVED*** RS ***REMOVED*** from 'constants/routeConstants';
import ***REMOVED*** Form, InputGroup, FormControl, Button ***REMOVED*** from 'react-bootstrap'
import ***REMOVED*** FaUser, FaKey, FaEnvelope ***REMOVED*** from 'react-icons/fa';
import ***REMOVED*** Formik ***REMOVED*** from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import './SignUp.css';

const validationSchema = yup.object().shape(***REMOVED***
    username: yup.string()
        .min(2, "*Username must be at least 2 characters")
        .max(30, "*Username must be less than 30 characters")
        .required("*Username is required"),
    email: yup.string()
        .email("Must be a valid email address")
        .max(100, "*Email must be less than 100 characters")
        .required("*Email is required"),
    password: yup.string()
        .min(4, "*Password must be at least 4 characters")
        .max(100, "*Password must be less than 100 characters")
        .required("*Password is required"),
    confirmPassword: yup.string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("*Must confirm password")
  ***REMOVED***);

class SignUp extends React.Component ***REMOVED***
    constructor(props) ***REMOVED***
        super(props);
        this.state = ***REMOVED******REMOVED***
    ***REMOVED***

    componentDidMount() ***REMOVED***

    ***REMOVED***

    signUp = values => ***REMOVED***
        this.props.signupUser(values);
    ***REMOVED***

    render() ***REMOVED***
        const ***REMOVED*** isSignup, error ***REMOVED*** = this.props.userReducer;
        return (
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3>Sign Up</h3>
                        </div>
                        <div className="card-body">
                            <div className="card-errors">
                                ***REMOVED***error***REMOVED***
                            </div>
                            <Formik
                                validationSchema=***REMOVED***validationSchema***REMOVED***
                                onSubmit=***REMOVED***this.signUp***REMOVED***
                                initialValues=***REMOVED******REMOVED***
                                    username: '',
                                    email: '',
                                    password: '',
                                    confirmPassword: ''
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
                                    <Form.Group controlId="formUsername">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><FaUser/></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                name="username"
                                                placeholder="Username"
                                                aria-label="Username"
                                                aria-describedby="Username"
                                                value=***REMOVED***values.username***REMOVED***
                                                onChange=***REMOVED***handleChange***REMOVED***
                                                isInvalid=***REMOVED***touched.username && !!errors.username***REMOVED***
                                                autoFocus
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                ***REMOVED***errors.username***REMOVED***
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
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
                                                value=***REMOVED***values.email***REMOVED***
                                                onChange=***REMOVED***handleChange***REMOVED***
                                                isInvalid=***REMOVED***touched.email && !!errors.email***REMOVED***
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
                                    <Form.Group controlId="formConfirmPassword">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><FaKey/></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                type="password"
                                                name="confirmPassword"
                                                placeholder="Confirm password"
                                                aria-label="Confirm password"
                                                aria-describedby="basic-addon1"
                                                value=***REMOVED***values.confirmPassword***REMOVED***
                                                onChange=***REMOVED***handleChange***REMOVED***
                                                isInvalid=***REMOVED***touched.confirmPassword && !!errors.confirmPassword***REMOVED***
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                ***REMOVED***errors.confirmPassword***REMOVED***
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Button 
                                        variant="primary" 
                                        type="submit" 
                                        className="btn float-right login_btn" 
                                        disabled=***REMOVED***isSignup***REMOVED***>Submit</Button>
                                </Form>
                            )***REMOVED***
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        );
    ***REMOVED***
***REMOVED***

SignUp.propTypes = ***REMOVED***
    signupUser: PropTypes.func,
    userReducer: PropTypes.object
***REMOVED***;

const mapStateToProps = state => ***REMOVED***
    return ***REMOVED***
        userReducer: state.userReducer
    ***REMOVED***;
***REMOVED***

const mapDispatchToProps = dispatch => bindActionCreators(***REMOVED*** signupUser ***REMOVED***, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));

