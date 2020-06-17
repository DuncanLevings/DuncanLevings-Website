/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Container, Row, Form, InputGroup, FormControl, Button, Col, Alert } from 'react-bootstrap';
import { contactSchema } from 'components/helpers/formValidation';
import './Contact.scss';
import { Formik } from 'formik';
import { FaEnvelope, FaUser, FaEnvelopeOpenText } from 'react-icons/fa';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    submit = values => {
        console.log(values);
    }

    render() {
        return (
            <Container className="Contact">
                <Row>
                    <div className="center-head">
                        <span className="text body-head">
                            CONTACT
                        </span>
                    </div>
                </Row>
                <Row className="justify-content-center">
                    <Formik
                        validationSchema={contactSchema}
                        onSubmit={this.submit}
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                            message: ''
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
                            <Form.Row>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="formFirstName">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><FaUser/></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                name="firstName"
                                                placeholder="Your First Name"
                                                aria-label="First Name"
                                                aria-describedby="First Name"
                                                value={values.firstName}
                                                onChange={handleChange}
                                                isInvalid={touched.firstName && !!errors.firstName}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.firstName}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="formLastName">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><FaUser/></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                name="lastName"
                                                placeholder="Your Last Name"
                                                aria-label="Last Name"
                                                aria-describedby="Last Name"
                                                value={values.lastName}
                                                onChange={handleChange}
                                                isInvalid={touched.lastName && !!errors.lastName}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.lastName}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                
                            </Form.Row>
                            <Form.Group controlId="formEmail">
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><FaEnvelope/></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        type="email"
                                        name="email"
                                        placeholder="Your E-Mail Address"
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
                            <Form.Group controlId="formMessage">
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><FaEnvelopeOpenText/></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl as ="textarea" rows={5}
                                        className="contact-message"
                                        name="message"
                                        placeholder="Your Message"
                                        aria-label="Message"
                                        aria-describedby="Message"
                                        value={values.message}
                                        onChange={handleChange}
                                        isInvalid={touched.message && !!errors.message}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.message}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Row className="contact-formRow justify-content-center">
                                <Button
                                    variant="button-primary" 
                                    type="submit"
                                    disabled={true}>Send</Button>
                            </Form.Row>
                        </Form>
                    )}
                    </Formik>
                </Row>
            </Container>
        );
    }
}

export default Contact;
