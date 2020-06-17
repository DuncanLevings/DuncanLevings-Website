/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signupUser } from 'store/actions/userActions';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { FaUser, FaKey, FaEnvelope } from 'react-icons/fa';
import { Formik } from 'formik';
import { signUpSchema } from 'components/helpers/formValidation';
import PropTypes from 'prop-types';
import './SignUp.scss';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    signUp = values => {
        this.props.signupUser(values);
    }

    render() {
        const { isSignup, error } = this.props.userReducer;
        return (
            <div className="login">
                <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3>Sign Up</h3>
                            </div>
                            <div className="card-body">
                                <div className="card-errors">
                                    {error}
                                </div>
                                <Formik
                                    validationSchema={signUpSchema}
                                    onSubmit={this.signUp}
                                    initialValues={{
                                        username: '',
                                        email: '',
                                        password: '',
                                        confirmPassword: ''
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
                                                    value={values.username}
                                                    onChange={handleChange}
                                                    isInvalid={touched.username && !!errors.username}
                                                    autoFocus
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.username}
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
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    isInvalid={touched.email && !!errors.email}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.email}
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
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    isInvalid={touched.password && !!errors.password}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.password}
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
                                                    value={values.confirmPassword}
                                                    onChange={handleChange}
                                                    isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.confirmPassword}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                        <Button 
                                            variant="primary" 
                                            type="submit" 
                                            className="btn float-right login_btn" 
                                            disabled={isSignup}>Submit</Button>
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

SignUp.propTypes = {
    signupUser: PropTypes.func,
    userReducer: PropTypes.object
};

const mapStateToProps = state => {
    return {
        userReducer: state.userReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ signupUser }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));

