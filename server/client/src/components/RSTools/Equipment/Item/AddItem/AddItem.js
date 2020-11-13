/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Button, Form, FormControl, InputGroup, Modal, Spinner } from 'react-bootstrap';
import SlotSelector from '../../SlotSelector/SlotSelector.lazy';
import ImgPreview from 'components/tools/ImgPreview/ImgPreview.lazy';
import ImgCrop from 'components/tools/ImgCrop/ImgCrop.lazy';
import { EQUIPMENT_CONSTS } from 'consts/RSTools_Consts';
import { ItemSchema } from 'components/helpers/formValidation';
import { Formik } from 'formik';
import { FaImage } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './AddItem.scss';

class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgCropShow: false,
            imgPreviewShow: false,
            imgPreviewURL: "",
            imageRequired: false,
            augment: false,
            slot: null,
            reset: false
        }
    }

    componentDidMount() {
        if (this.props.selectedSlot) this.setState({ slot: this.props.selectedSlot });
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedSlot !== prevProps.selectedSlot) {
            this.setState({ slot: this.props.selectedSlot });
        }
    }

    setSelected = (slot) => {
        this.setState({ slot: slot });
    }

    setAugment = (bool) => {
        this.setState({ augment: bool });
    }

    clearSelected = () => {
        window.URL.revokeObjectURL(this.state.imgPreviewURL);
        this.setState({ slot: null, reset: false, augment: false });
        this.props.clearErrors();
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
        // if (!values.image) return this.setState({ imageRequired: true });

        let formData = new FormData();

        formData.append('slot', this.state.slot);
        formData.append('name', values.name);
        formData.append('wikiUrl', values.wikiURL);
        // formData.append('image', values.image.blob, `${values.name}-image`);

        if (this.state.augment) {
            formData.append('isAugmented', this.state.augment);
            formData.append('gizmo1', values.gizmo1);
            formData.append('gizmo2', values.gizmo2);
        }

        // familiar type item only
        if (this.state.slot === 14) {
            formData.append('familiarSize', values.familiarSize);
        }

        // window.URL.revokeObjectURL(values.image.url);

        this.props.createItem(formData);
        this.setState({ reset: true });
    }

    render() {
        const { createItem, clearErrors, equipmentReducer, selectedSlot, ...rest } = this.props;
        const { imgCropShow, imgPreviewShow, imgPreviewURL, slot, imageRequired, reset, augment } = this.state;
        const { isCreating, error } = equipmentReducer;

        return (
            <Modal
                {...rest}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="AddItem"
                centered
            >
                <Modal.Header>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {slot == null ?
                        <div>
                            <p>To begin select a slot:</p>
                            <div className="slot-container">
                                <SlotSelector setSelected={slot => this.setSelected(slot)} />
                            </div>
                        </div>
                        :
                        <div>
                            <Button variant="button-secondary" onClick={() => this.clearSelected()}>Change Selection</Button>
                            <div className="spacer-h-2" />
                            <p>Creating: <b>{EQUIPMENT_CONSTS.slotTypes[slot]}</b></p>
                            <div className="item-error">
                                <p>{error}</p>
                                <p>{imageRequired ? "Image missing!" : ''}</p>
                            </div>
                            <Formik
                                validationSchema={ItemSchema}
                                onSubmit={this.submitItem}
                                initialValues={{
                                    name: '',
                                    wikiURL: '',
                                    image: null,
                                    familiarSize: 0,
                                    gizmo1: '',
                                    gizmo2: ''
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
                                            {slot === 14 ?
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
                                                slot > 5 && slot < 10 || slot === 13 ? // augmentable equipable slots
                                                    augment ?
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
                                                                    <Button variant="button-secondary" onClick={() => this.setAugment(false)}>Remove Augment</Button>
                                                                </InputGroup.Append>
                                                            </InputGroup>
                                                        </Form.Group>
                                                        :
                                                        <div className="augment-button">
                                                            <Button variant="button-secondary" onClick={() => this.setAugment(true)}>Augment Item</Button>
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
                    }
                </Modal.Body>
                <Modal.Footer>
                    {reset ?
                        <Button variant="button-secondary" onClick={() => this.clearSelected()}>Add another item</Button>
                        : null}
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

AddItem.propTypes = {
    equipmentReducer: PropTypes.object.isRequired,
    createItem: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    selectedSlot: PropTypes.number
};

export default AddItem;
