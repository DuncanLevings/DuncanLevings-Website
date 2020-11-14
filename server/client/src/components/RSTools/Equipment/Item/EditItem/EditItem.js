/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Button, Form, FormControl, InputGroup, Modal, Spinner } from 'react-bootstrap';
import ImgPreview from 'components/tools/ImgPreview/ImgPreview.lazy';
import ImgCrop from 'components/tools/ImgCrop/ImgCrop.lazy';
import { EQUIPMENT_CONSTS } from 'consts/RSTools_Consts';
import { ItemSchema } from 'components/helpers/formValidation';
import { Formik } from 'formik';
import { FaImage } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './EditItem.scss';

class EditItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgCropShow: false,
            imgPreviewShow: false,
            imgPreviewURL: "",
            imageRequired: false
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
        if (this.props.equipmentReducer.searchItems !== prevProps.equipmentReducer.searchItems) {
            this.props.onHide();
        }
    }

    setAugment = (bool, values, setValues) => {
        const isAugmented = bool;
        setValues({ ...values, isAugmented });
    }

    setImgCropShow = (bool) => {
        this.setState({ imgCropShow: bool });
    }

    setPreviewImgShow = (bool, img) => {
        this.setState({
            imgPreviewShow: bool,
            imgPreviewURL: img == undefined ? "" : img
        });
    }

    setImage = (img, values, setValues) => {
        this.setState({ imageRequired: false })
        this.setImgCropShow(false);
        const image = img;
        setValues({ ...values, image });
    }

    removeImg = (values, setValues) => {
        this.setPreviewImgShow(false);
        const image = null;
        window.URL.revokeObjectURL(this.state.imgPreviewURL);
        setValues({ ...values, image });
    }

    submitItem = values => {
        const { editItemObj } = this.props.equipmentReducer;
        if (!values.image) return this.setState({ imageRequired: true });

        let formData = new FormData();

        formData.append('itemId', editItemObj._id);
        formData.append('name', values.name);
        formData.append('wikiUrl', values.wikiURL);

        if (values.image.blob) {
            formData.append('image', values.image.blob, `${values.name}-image`);
        }

        if (values.isAugmented) {
            formData.append('isAugmented', values.isAugmented);
            formData.append('gizmo1', values.gizmo1);
            formData.append('gizmo2', values.gizmo2);
        }

        // familiar type item only
        if (editItemObj.slot === 14) {
            formData.append('familiarSize', values.familiarSize);
        }

        window.URL.revokeObjectURL(values.image.url);

        this.props.editItem(formData);
    }

    render() {
        const { editItem, clearErrors, equipmentReducer, ...rest } = this.props;
        const { imgCropShow, imgPreviewShow, imgPreviewURL, imageRequired } = this.state;
        const { editItemObj, isSaving, isFetching, error } = equipmentReducer;

        return (
            <Modal
                {...rest}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="EditItem"
                centered
            >
                <Modal.Header>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Editing: <b>{editItemObj ? EQUIPMENT_CONSTS.slotTypes[editItemObj.slot] : null}</b></p>
                    <div className="item-error">
                        <p>{error}</p>
                        <p>{imageRequired ? "Image missing!" : ''}</p>
                    </div>
                    {isFetching ? <Spinner animation="border" variant="dark" /> :
                        editItemObj ?
                            <Formik
                                validationSchema={ItemSchema}
                                onSubmit={this.submitItem}
                                initialValues={{
                                    name: editItemObj.name,
                                    wikiURL: editItemObj.wiki || '',
                                    image: { url: editItemObj.imageUrl },
                                    familiarSize: editItemObj.familiarSize || 0,
                                    isAugmented: editItemObj.augment ? editItemObj.augment.isAugmented : false,
                                    gizmo1: editItemObj.augment ? editItemObj.augment.gizmo1 : '',
                                    gizmo2: editItemObj.augment ? editItemObj.augment.gizmo2 : ''
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
                                            <Form.Group controlId="formWiki">
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Wiki link (optional):</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl
                                                        name="wikiURL"
                                                        placeholder="url..."
                                                        aria-label="wikiURL"
                                                        aria-describedby="wikiURL"
                                                        value={values.wikiURL}
                                                        onChange={handleChange}
                                                        isInvalid={touched.wikiURL && !!errors.wikiURL}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.wikiURL}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Form.Group>
                                            {editItemObj.slot === 14 ?
                                                <Form.Group controlId="formFamiliarSize">
                                                    <InputGroup>
                                                        <InputGroup.Prepend>
                                                            <InputGroup.Text>Familiar Inventory size:</InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <Form.Control
                                                            as="select"
                                                            name="familiarSize"
                                                            aria-label="familiarSize"
                                                            aria-describedby="familiarSize"
                                                            value={values.familiarSize}
                                                            onChange={handleChange}
                                                            isInvalid={touched.familiarSize && !!errors.familiarSize}
                                                        >
                                                            <option value={0}>Not a beast of burden</option>
                                                            <option value={30}>30 - Pack yak</option>
                                                            <option value={22}>22 - Spirit pack pig T3</option>
                                                            <option value={18}>18 - War tortoise</option>
                                                            <option value={12}>12 - Spirit terrorbird</option>
                                                            <option value={9}>9 - Bull ant</option>
                                                            <option value={8}>8 - Spirit pack pig T2</option>
                                                            <option value={6}>6 - Spirit kalphite</option>
                                                            <option value={4}>4 - Spirit pack pig T1</option>
                                                            <option value={3}>3 - Thorny snail</option>
                                                            <option value={32}>32 - Pack mammoth</option>
                                                        </Form.Control>
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.familiarSize}
                                                        </Form.Control.Feedback>
                                                    </InputGroup>
                                                </Form.Group>
                                                :
                                                editItemObj.slot > 5 && editItemObj.slot < 10 || editItemObj.slot === 13 ? // augmentable equipable slots
                                                    values.isAugmented ?
                                                        <Form.Group controlId="formWiki">
                                                            <InputGroup>
                                                                <InputGroup.Prepend>
                                                                    <InputGroup.Text>Gizmo Notes:</InputGroup.Text>
                                                                </InputGroup.Prepend>
                                                                <FormControl
                                                                    name="gizmo1"
                                                                    placeholder="Gizmo #1 notes..."
                                                                    aria-label="gizmo1"
                                                                    aria-describedby="gizmo1"
                                                                    value={values.gizmo1}
                                                                    onChange={handleChange}
                                                                />
                                                                <FormControl
                                                                    name="gizmo2"
                                                                    placeholder="Gizmo #2 notes..."
                                                                    aria-label="gizmo2"
                                                                    aria-describedby="gizmo2"
                                                                    value={values.gizmo2}
                                                                    onChange={handleChange}
                                                                />
                                                                <InputGroup.Append>
                                                                    <Button variant="button-secondary" onClick={() => this.setAugment(false, values, setValues)}>Remove Augment</Button>
                                                                </InputGroup.Append>
                                                            </InputGroup>
                                                        </Form.Group>
                                                        :
                                                        <div className="augment-button">
                                                            <Button variant="button-secondary" onClick={() => this.setAugment(true, values, setValues)}>Augment Item</Button>
                                                        </div>
                                                    : null
                                            }
                                            <div className="image-button">
                                                {values.image && values.image.url ?
                                                    <Button variant="button-secondary" onClick={() => this.setPreviewImgShow(true, values.image.url)}><FaImage /> Preview Image</Button>
                                                    :
                                                    <Button variant="button-secondary" onClick={() => this.setImgCropShow(true)}><FaImage /> Add Image</Button>
                                                }
                                            </div>
                                            <div className="item-button">
                                                <Button
                                                    variant="button-primary"
                                                    type="submit"
                                                    disabled={isSaving}>Submit {isSaving ? <Spinner animation="border" variant="light" size="sm" /> : null}</Button>
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
                            : null
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

EditItem.propTypes = {
    equipmentReducer: PropTypes.object.isRequired,
    editItem: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
};

export default EditItem;
