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
import { LOGIN_TYPE } from 'consts';
import { RESUME_ROUTES } from 'consts/Resume_Consts';
import { Form, InputGroup, FormControl, Button, Container, Card, Spinner } from 'react-bootstrap'
import { FaUser, FaKey } from 'react-icons/fa';
import { loginSchema } from 'components/helpers/formValidation';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import './Login.scss';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from_path: "",
            sign_up: "",
            forgot_pass: ""
        }
    }

    componentDidMount() {
        const { type } = this.props;
        var from, signup, forgot = "";

        switch (type) {
            case LOGIN_TYPE.ADMIN:
                from = RESUME_ROUTES.HOME;
                break;
            case LOGIN_TYPE.RS_TOOLS:
                from = RSTOOL_ROUTES.DASH;
                signup = RSTOOL_ROUTES.SIGNUP;
                forgot = RSTOOL_ROUTES.FORGOTPASS;
                break;
            default:
                break;
        }

        this.setState({
            from_path: from,
            sign_up: signup,
            forgot_pass: forgot
        });
    }

    login = values => {
        const { from } = this.props.location.state || { from: { pathname: this.state.from_path } };
        this.props.loginUser(values, from);
    }

    render() {
        const { isLogin, error } = this.props.userReducer;
        const { sign_up, forgot_pass } = this.state;

        return (
            <div className="Login">
                <Container className="content">
                    <Card>
                        <Card.Header as="h3">Sign In</Card.Header>
                        <Card.Body>
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
                                                        <InputGroup.Text><FaUser /></InputGroup.Text>
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
                                                        <InputGroup.Text><FaKey /></InputGroup.Text>
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
                                                variant="button-primary"
                                                type="submit"
                                                className="btn float-right login_btn"
                                                disabled={isLogin}
                                            >
                                                {isLogin ? <Spinner animation="border" variant="light" /> : "Submit"}
                                            </Button>
                                        </Form>
                                    )}
                            </Formik>
                        </Card.Body>
                        <Card.Footer>
                            {this.props.type === LOGIN_TYPE.ADMIN ? (null) : (
                                <div>
                                    <div className="d-flex justify-content-center links">
                                        Don't have an account?<Link to={sign_up}>Sign Up</Link>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <Link to={forgot_pass}>Forgot your password?</Link>
                                    </div>
                                </div>
                            )}
                        </Card.Footer>
                    </Card>
                </Container>
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
