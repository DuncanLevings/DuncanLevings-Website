/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
// import ***REMOVED*** RS ***REMOVED*** from 'constants/routeConstants';
import ***REMOVED*** Form, InputGroup, FormControl, Button ***REMOVED*** from 'react-bootstrap'
import ***REMOVED*** Formik ***REMOVED*** from 'formik';
import ***REMOVED*** FaEnvelope ***REMOVED*** from 'react-icons/fa';
import * as yup from 'yup';
// import PropTypes from 'prop-types';
import './ForgotPassword.scss';

const validationSchema = yup.object().shape(***REMOVED***
    email: yup.string()
        .email("Must be a valid email address")
        .max(100, "*Email must be less than 100 characters")
        .required("*Email is required")
  ***REMOVED***);

class ForgotPassword extends React.Component ***REMOVED***
    constructor(props) ***REMOVED***
        super(props);
        this.state = ***REMOVED******REMOVED***
    ***REMOVED***

    componentDidMount() ***REMOVED***

    ***REMOVED***

    sendReset = values => ***REMOVED***
        console.log("sending email not implemented yet...");
    ***REMOVED***

    render() ***REMOVED***
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
                                    validationSchema=***REMOVED***validationSchema***REMOVED***
                                    onSubmit=***REMOVED***this.sendReset***REMOVED***
                                    initialValues=***REMOVED******REMOVED***
                                        email: ''
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
                                                    autoFocus
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    ***REMOVED***errors.email***REMOVED***
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
                                )***REMOVED***
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    ***REMOVED***
***REMOVED***

// ForgotPassword.propTypes = ***REMOVED******REMOVED***;

// ForgotPassword.defaultProps = ***REMOVED******REMOVED***;

export default ForgotPassword;
