/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Container, Form, FormControl, InputGroup, ListGroup, Spinner } from 'react-bootstrap';
import { ErrorMessage, Field, FieldArray, Formik } from 'formik';
import { dailySchema } from 'components/helpers/formValidation';
import { FaImage, FaPlus, FaTrash } from 'react-icons/fa';
import { createDaily } from 'store/actions/dailyActions';
import ImgCrop from 'components/tools/ImgCrop/ImgCrop.lazy';
import ImgPreview from 'components/tools/ImgPreview/ImgPreview.lazy';
import FormData from 'form-data';
import PropTypes from 'prop-types';
import './AddDaily.scss';

class AddDaily extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgCropShow: false,
            imgPreviewShow: false,
            imgPreviewURL: "",
            selectedStep: 0
        }
    }

    componentDidMount() {

    }

    setImgCropShow = (bool, i) => {
        this.setState({ 
            imgCropShow: bool, 
            selectedStep: i == undefined ? this.state.selectedStep : i 
        });
    }

    setPreviewImgShow = (bool, i, img) => {
        this.setState({ 
            imgPreviewShow: bool, 
            selectedStep: i == undefined ? this.state.selectedStep : i, 
            imgPreviewURL: img == undefined ? "" : img 
        });
    }

    addStep = (field, values, setValues) => e => {
        const steps = [...values.steps];
        steps.push({ step: '', img: '' });
        setValues({ ...values, steps });
        field.onChange(e);
    }

    removeStep = (i, field, values, setValues) => e => {
        var steps = [...values.steps];
        steps = steps.filter((_, index) => index !== i);
        setValues({ ...values, steps });
        field.onChange(e);
    }

    setImage = (img, values, setValues) => {
        this.setImgCropShow(false);
        const steps = [...values.steps];
        steps[this.state.selectedStep].img = img;
        setValues({ ...values, steps });
    }

    removeImg = (values, setValues) => {
        this.setPreviewImgShow(false);
        const steps = [...values.steps];
        window.URL.revokeObjectURL(this.state.imgPreviewURL);
        steps[this.state.selectedStep].img = {};
        setValues({ ...values, steps });
    }
    

    submitProject = values => {
        let formData = new FormData();

        formData.append('title', values.title);
        formData.append('type', this.props.dailyReducer.dailyType);

        values.steps.forEach((step, i) => {
            formData.append('steps', step.step);

            if (step.img.blob) {
                formData.append('images', step.img.blob, `step_${i}`);
                window.URL.revokeObjectURL(step.img.url);
            }
        });
        
        this.props.createDaily(formData);
    }

    render() {
        const { dailyTypeName, isCreating, error } = this.props.dailyReducer;
        const { imgCropShow, imgPreviewShow, imgPreviewURL } = this.state;

        return (
            <Container>
                <div className="AddDaily">
                    <h1>Custom {dailyTypeName}</h1>
                    <div className="spacer-h-3" />
                    <div className="daily-error">
                        <p>{error}</p>
                    </div>
                    <Formik
                        validationSchema={dailySchema}
                        onSubmit={this.submitProject}
                        initialValues={{
                            title: '',
                            steps: [{ step: '', img: {} }]
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
                                    <Form.Group controlId="formTitle">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Title:</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                name="title"
                                                placeholder="Title"
                                                aria-label="Title"
                                                aria-describedby="Title"
                                                value={values.title}
                                                onChange={handleChange}
                                                isInvalid={touched.title && !!errors.title}
                                                autoFocus
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.title}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <hr className="divider" />
                                    <FieldArray name="steps">
                                        {() => (values.steps.map((step, i) => {
                                            const stepErrors = (errors.steps?.length && errors.steps[i]) || {};
                                            const stepTouched = (touched.steps?.length && touched.steps[i]) || {};
                                            return (
                                                <ListGroup variant="flush" key={i}>
                                                    <ListGroup.Item>
                                                        <Form.Row>
                                                            <Col>
                                                                <Form.Group>
                                                                    <InputGroup>
                                                                        <InputGroup.Prepend>
                                                                            <InputGroup.Text>Step {i + 1}:</InputGroup.Text>
                                                                        </InputGroup.Prepend>
                                                                        <Field name={`steps.${i}.step`} type="text" className={'form-control' + (stepErrors.step && stepTouched.step ? ' is-invalid' : '')} />
                                                                        <InputGroup.Append>
                                                                            {step.img.url ?
                                                                                <Button variant="button-secondary" onClick={() => this.setPreviewImgShow(true, i, step.img.url)}><FaImage /> Preview Image</Button>
                                                                                :
                                                                                <Button variant="button-secondary" onClick={() => this.setImgCropShow(true, i)}><FaImage /> Add Image</Button>
                                                                            }
                                                                            {i < 1 ?
                                                                                null :
                                                                                <Field name="stepTotal">
                                                                                    {({ field }) => (
                                                                                        <Button {...field} variant="button-warning-dull" onClick={this.removeStep(i, field, values, setValues)}><FaTrash /> Remove Step</Button>
                                                                                    )}
                                                                                </Field>
                                                                            }
                                                                        </InputGroup.Append>
                                                                        <ErrorMessage name={`steps.${i}.step`} component="div" className="invalid-feedback" />
                                                                    </InputGroup>
                                                                </Form.Group>
                                                            </Col>
                                                        </Form.Row>
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            );
                                        }))}
                                    </FieldArray>
                                    <Form.Group controlId="formAddStep">
                                        <Field name="stepTotal">
                                            {({ field }) => (
                                                <Button {...field} variant="button-primary" onClick={this.addStep(field, values, setValues)}><FaPlus /> Add Step</Button>
                                            )}
                                        </Field>
                                    </Form.Group>
                                    <hr className="divider" />
                                    <div className="daily-button">
                                        <Button
                                            variant="button-primary"
                                            type="submit"
                                            disabled={isCreating}>Submit {isCreating ? <Spinner animation="border" variant="light" size="sm" /> : null}</Button>
                                    </div>
                                    <ImgCrop
                                        show={imgCropShow}
                                        onHide={() => this.setImgCropShow(false)}
                                        onConfirm={img => this.setImage(img, values, setValues)}
                                    />
                                    <ImgPreview
                                        show={imgPreviewShow}
                                        onHide={() => this.setPreviewImgShow(false)}
                                        croppedImageUrl={imgPreviewURL}
                                        removeImg={() => this.removeImg(values, setValues)}
                                    />
                                </Form>
                            )}
                    </Formik>
                </div>
            </Container>
        );
    }
}

AddDaily.propTypes = {
    createDaily: PropTypes.func,
    dailyReducer: PropTypes.object
};

const mapStateToProps = state => {
    return {
        dailyReducer: state.dailyReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ createDaily }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddDaily);
