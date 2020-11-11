/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendMail } from 'store/actions/Resume/emailActions';
import { Container, Row, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { contactSchema } from 'components/helpers/formValidation';
import { Formik } from 'formik';
import { FaEnvelope, FaUser, FaEnvelopeOpenText } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './Contact.scss';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    submit = values => {
        console.log(values);
        this.props.sendMail(values);
    }

    render() {
        const { isSending, error } = this.props.emailReducer;

        return (
            <Container className="Contact">
                <Row>
                    <div className="center-head">
                        <span className="text body-head">
                            CONTACT ME
                        </span>
                    </div>
                </Row>
                <Row className="justify-content-center">
                    <Formik
                        validationSchema={contactSchema}
                        onSubmit={this.submit}
                        initialValues={{
                            name: '',
                            email: '',
                            subject: '',
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
                        <Form noValidate onSubmit={handleSubmit} className="contact-form">
                            <div className="contact-errors">
                                {error}
                            </div>
                            <Form.Group controlId="formName">
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><FaUser/></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        name="name"
                                        placeholder="Name"
                                        aria-label="Name"
                                        aria-describedby="Name"
                                        value={values.name}
                                        onChange={handleChange}
                                    />
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
                                        placeholder="E-Mail"
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
                            <Form.Group controlId="formSubject">
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><FaEnvelope/></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        name="subject"
                                        placeholder="Subject"
                                        aria-label="subject"
                                        aria-describedby="subject"
                                        value={values.subject}
                                        onChange={handleChange}
                                    />
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
                                        placeholder="Message"
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
                                    disabled={isSending}>Send</Button>
                            </Form.Row>
                        </Form>
                    )}
                    </Formik>
                </Row>
            </Container>
        );
    }
}

Contact.propTypes = {
    sendMail: PropTypes.func,
    emailReducer: PropTypes.object
};

const mapStateToProps = state => {
    return {
        emailReducer: state.emailReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ sendMail }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
