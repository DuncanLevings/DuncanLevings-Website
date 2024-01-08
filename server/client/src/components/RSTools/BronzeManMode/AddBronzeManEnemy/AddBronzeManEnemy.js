/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Button, Form, FormControl, InputGroup, Modal, Spinner } from 'react-bootstrap';
import { BronzeManEnemySchema } from 'components/helpers/formValidation';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import './AddBronzeManEnemy.scss';

class AddBronzeManEnemy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    submitEnemy = (values, { resetForm }) => {
        let formData = new FormData();

        formData.append('url', values.url);

        this.props.createEnemy(formData);
        resetForm();
    }

    clearSelected = () => {
        this.props.clearErrors();
    }

    render() {
        const { bronzeManReducer, createEnemy, clearErrors, ...rest } = this.props;
        const { isCreating, error } = bronzeManReducer;

        return (
            <Modal
                {...rest}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="AddBronzeManEnemy"
                centered
            >
                <Modal.Header>
                    <Modal.Title>Add Enemy</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                    <div className="spacer-h-2" />
                    <div className="enemy-error">
                        <p>{error}</p>
                    </div>
                    <Formik
                        validationSchema={BronzeManEnemySchema}
                        onSubmit={this.submitEnemy}
                        initialValues={{
                            url: ''
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
                                                <InputGroup.Text>URL:</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                name="url"
                                                placeholder="url..."
                                                aria-label="Url"
                                                aria-describedby="Url"
                                                value={values.url}
                                                onChange={handleChange}
                                                isInvalid={touched.url && !!errors.url}
                                                autoFocus
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.url}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <div className="enemy-button">
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

AddBronzeManEnemy.propTypes = {
    bronzeManReducer: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    createEnemy: PropTypes.func.isRequired,
};

export default AddBronzeManEnemy;
