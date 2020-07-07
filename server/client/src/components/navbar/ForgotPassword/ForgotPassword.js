/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Form, InputGroup, FormControl, Button, Container, Card } from 'react-bootstrap'
import { Formik } from 'formik';
import { FaEnvelope } from 'react-icons/fa';
import { forgotPassSchema } from 'components/helpers/formValidation';
import './ForgotPassword.scss';

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
            <div className="ForgotPassword">
                <Container className="content">
                    <Card>
                        <Card.Header as="h3">Forgot Password</Card.Header>
                        <Card.Body>
                            <Formik
                                validationSchema={forgotPassSchema}
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
                                                        <InputGroup.Text><FaEnvelope /></InputGroup.Text>
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
                                                variant="button-primary"
                                                type="submit"
                                                className="btn float-right login_btn">
                                                Submit
                                        </Button>
                                        </Form>
                                    )}
                            </Formik>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default ForgotPassword;
