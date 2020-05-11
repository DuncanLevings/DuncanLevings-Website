/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** Form, InputGroup, FormControl, Button ***REMOVED*** from 'react-bootstrap'
import ***REMOVED*** FaUser, FaKey ***REMOVED*** from 'react-icons/fa';
import './Login.css';

class Login extends React.Component ***REMOVED***
    constructor() ***REMOVED***
        super();
        this.state = ***REMOVED******REMOVED***
    ***REMOVED***

    componentDidMount() ***REMOVED***

    ***REMOVED***

    render() ***REMOVED***
        return (
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3>Sign In</h3>
                        </div>
                        <div className="card-body">
                            <Form>
                                <Form.Group controlId="formLoginEmail">
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon1"><FaUser/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            placeholder="Email"
                                            aria-label="Email"
                                            aria-describedby="basic-addon1"
                                            type="email"
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formLoginPassword">
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon1"><FaKey/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            placeholder="Password"
                                            aria-label="Password"
                                            aria-describedby="basic-addon1"
                                            type="password"
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formLoginPassword">
                                    <Form.Check
                                            inline
                                            type="checkbox"
                                            label="Remember Me"
                                            id="rememberMe"
                                            className="remember"
                                        />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="btn float-right login_btn">
                                    Submit
                                </Button>
                            </Form>
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

export default Login;
