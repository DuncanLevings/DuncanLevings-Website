/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Button, Form, FormControl, InputGroup, Modal, Spinner } from 'react-bootstrap';
import { BronzeManItemSchema } from 'components/helpers/formValidation';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import './AddBronzeManItem.scss';

class AddBronzeManItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    submitItem = (values, { resetForm }) => {
        let formData = new FormData();

        formData.append('name', values.name);
        formData.append('acquired', values.acquired);

        this.props.createItem(formData);
        resetForm();
    }

    clearSelected = () => {
        this.props.clearErrors();
    }

    render() {
        const { bronzeManReducer, createItem, clearErrors, ...rest } = this.props;
        const { isCreating, error } = bronzeManReducer;

        return (
            <Modal
                {...rest}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="AddBronzeManItem"
                centered
            >
                <Modal.Header>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                    <div className="spacer-h-2" />
                    <div className="item-error">
                        <p>{error}</p>
                    </div>
                    <Formik
                        validationSchema={BronzeManItemSchema}
                        onSubmit={this.submitItem}
                        initialValues={{
                            name: '',
                            acquired: true
                        }}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            setValues,
                            values,
                            touched,
                            errors
                        }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group controlId="formName">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Name:</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                name="name"
                                                placeholder="name..."
                                                aria-label="Name"
                                                aria-describedby="Name"
                                                value={values.name}
                                                onChange={handleChange}
                                                isInvalid={touched.name && !!errors.name}
                                                autoFocus
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.name}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="formAcquired">
                                                <Form.Check
                                                    type="checkbox"
                                                    name="acquired"
                                                    label="Acquired?"
                                                    className="acquired"
                                                    value={values.acquired}
                                                    onChange={handleChange}
                                                    defaultChecked
                                                    inline
                                                />
                                            </Form.Group>
                                    <div className="item-button">
                                        <Button
                                            variant="button-primary"
                                            type="submit"
                                            disabled={isCreating}>Submit {isCreating ? <Spinner animation="border" variant="light" size="sm" /> : null}</Button>
                                    </div>
                                </Form>
                            )}
                    </Formik>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

AddBronzeManItem.propTypes = {
    bronzeManReducer: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    createItem: PropTypes.func.isRequired,
};

export default AddBronzeManItem;
