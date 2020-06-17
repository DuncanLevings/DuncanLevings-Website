/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from 'store/actions/userActions';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { FaUser, FaKey } from 'react-icons/fa';
import { loginSchema } from 'components/helpers/formValidation';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import './Login.scss';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    login = values => {
        const { from } = this.props.location.state || { from: { pathname: RSTOOL_ROUTES.DASH } };
        this.props.loginUser(values, from);
    }

    render() {
        const { isLogin, error } = this.props.userReducer;
        return (
            <div className="login">
                <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3>Sign In</h3>
                            </div>
                            <div className="card-body">
                                <div className="card-errors">
                                    {error}
                                </div>
                                <Formik
                                    validationSchema={loginSchema}
                                    onSubmit={this.login}
                                    initialValues={{
                                        email: '',
                                        password: '',
                                        remember_me: false
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
                                                    <InputGroup.Text><FaUser/></InputGroup.Text>
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
                                        <Form.Group controlId="formRememberMe">
                                            <Form.Check
                                                    type="checkbox"
                                                    name="remember_me"
                                                    label="Remember Me"
                                                    className="remember"
                                                    value={values.remember_me}
                                                    onChange={handleChange}
                                                    inline
                                                />
                                        </Form.Group>
                                        <Button 
                                            variant="primary" 
                                            type="submit" 
                                            className="btn float-right login_btn" 
                                            disabled={isLogin}>Submit</Button>
                                    </Form>
                                )}
                                </Formik>
                            </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-center links">
                                    Don't have an account?<Link to={RSTOOL_ROUTES.SIGNUP}>Sign Up</Link>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Link to={RSTOOL_ROUTES.FORGOTPASS}>Forgot your password?</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func,
    userReducer: PropTypes.object
};

const mapStateToProps = state => {
    return {
        userReducer: state.userReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ loginUser }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
