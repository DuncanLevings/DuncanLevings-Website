/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPvmType, getPvmSingle, createPvm, editPvm } from 'store/actions/RSTools/pvmActions';
import { Button, Container, Form, FormControl, InputGroup, Spinner } from 'react-bootstrap';
import { compressAccurately } from 'image-conversion';
import { pvmSchema } from 'components/helpers/formValidation';
import { Formik } from 'formik';
import { FaImage, FaMap } from 'react-icons/fa';
import ImgCrop from 'components/tools/ImgCrop/ImgCrop.lazy';
import ImgPreview from 'components/tools/ImgPreview/ImgPreview.lazy';
import MapSelection from 'components/RSTools/tools/MapSelection/MapSelection.lazy';
import FormData from 'form-data';
import PropTypes from 'prop-types';
import './PvmBuilder.scss';

class PvmBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pvm: null,
            imgCropShow: false,
            imgPreviewShow: false,
            mapSelectShow: false,
            imgMissing: false,
            imgCompressing: false,
            thumbnail: null,
            imgPreviewURL: "",
            mapURL: ""
        }
    }

    componentDidMount() {
        const type = parseInt(localStorage.getItem("pvmType"));
        this.props.setPvmType(type);

        if (this.checkEditMode()) {
            this.props.getPvmSingle(this.props.location.state.pvmId);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.pvmReducer.pvmSingle !== prevProps.pvmReducer.pvmSingle) {
            if (this.checkEditMode()) {
                const pvm = this.props.pvmReducer.pvmSingle;
                this.setState({
                    pvm: pvm,
                    mapURL: pvm.mapURL ? pvm.mapURL : ''
                });
            }
        }
    }

    checkEditMode = () => {
        return this.props.location.state && this.props.location.state.editMode;
    }

    setImgCropShow = (bool) => {
        this.setState({
            imgCropShow: bool
        });
    }

    setPreviewImgShow = (bool, img) => {
        this.setState({
            imgPreviewShow: bool,
            imgPreviewURL: img
        });
    }

    setImage = (imgBlob, values, setValues) => {
        this.setState({ imgMissing: false, imgCompressing: true });
        this.setImgCropShow(false);
        const img = imgBlob;
        setValues({ ...values, img });

        compressAccurately(imgBlob.blob, {
            size: 10,
            type: "image/png",
            width: 32
        }).then(res => {
            this.setState({ thumbnail: res, imgCompressing: false });
        });
    }

    removeImg = (values, setValues) => {
        this.setPreviewImgShow(false);
        window.URL.revokeObjectURL(this.state.imgPreviewURL);
        const img = null;
        setValues({ ...values, img });
        this.setState({ thumbnail: null });
    }

    setMapSelectShow = (bool) => {
        this.setState({ mapSelectShow: bool });
    }

    setMapURL = (url) => {
        this.setState({ mapURL: url });
        this.setMapSelectShow(false);
    }

    getInitalValues = () => {
        if (this.checkEditMode()) {
            const { pvm } = this.state;

            return {
                name: pvm.name || '',
                img: { url: pvm.imageUrl } || null,
                wikiURL: pvm.wikiURL || ''
            }
        }

        return {
            name: '',
            img: null,
            wikiURL: ''
        }
    }

    submit = values => {
        if (!values.img) return this.setState({ imgMissing: true });

        let formData = new FormData();

        if (this.checkEditMode()) formData.append('pvmId', this.state.pvm._id);
        formData.append('name', values.name);
        formData.append('mapURL', this.state.mapURL);
        formData.append('wikiURL', values.wikiURL);
        formData.append('type', this.props.pvmReducer.pvmType);

        if (values.img.blob) {
            formData.append('images', values.img.blob, `${values.name}-image`);
            formData.append('images', this.state.thumbnail, `${values.name}-thumbnail-image`);
            window.URL.revokeObjectURL(values.img.url);
        }

        if (this.checkEditMode()) {
            this.props.editPvm(formData, this.props.location.state.from);
        } else {
            this.props.createPvm(formData, this.props.location.state.from);
        }
    }

    render() {
        const { isCreating, isSaving, isFetching, pvmTypeName, error } = this.props.pvmReducer;
        const { pvm, imgCropShow, imgPreviewShow, imgMissing, imgCompressing, imgPreviewURL, mapSelectShow, mapURL } = this.state;

        if (this.checkEditMode()) {
            if (isFetching || !pvm) {
                return (
                    <div className="PvmBuilder">
                        <Spinner animation="border" variant="light" />
                    </div>
                );
            }
        }

        return (
            <Container>
                <div className="PvmBuilder">
                    <h1>{pvmTypeName} Enemy</h1>
                    <div className="spacer-h-3" />
                    <div className="error">
                        <p>{error}</p>
                    </div>
                    <Formik
                        validationSchema={pvmSchema}
                        onSubmit={this.submit}
                        initialValues={this.getInitalValues()}
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
                                                placeholder="Name"
                                                aria-label="Name"
                                                aria-describedby="Name"
                                                value={values.name}
                                                onChange={handleChange}
                                                isInvalid={touched.name && !!errors.name}
                                                autoFocus
                                            />
                                            <InputGroup.Append>
                                                <Button variant="button-secondary" onClick={() => this.setMapSelectShow(true)}><FaMap /> Set Map</Button>
                                            </InputGroup.Append>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.name}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    {imgMissing ?
                                        <div className="error">
                                            <p>Image is required!</p>
                                        </div>
                                        : null}
                                    {values.img && values.img.url ?
                                        <Button variant="button-secondary" onClick={() => this.setPreviewImgShow(true, values.img.url)}><FaImage /> Preview Image</Button>
                                        :
                                        <Button variant="button-secondary" onClick={() => this.setImgCropShow(true)}><FaImage /> Add Image</Button>
                                    }
                                    <div className="spacer-h-2" />
                                    <Form.Group controlId="formWiki">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Wiki Page:</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                name="wikiURL"
                                                placeholder="wiki url..."
                                                aria-label="wikiURL"
                                                aria-describedby="wikiURL"
                                                value={values.wikiURL}
                                                onChange={handleChange}
                                                isInvalid={touched.wikiURL && !!errors.wikiURL}
                                                autoFocus
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.wikiURL}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <div className="submit-button">
                                        <Button
                                            variant="button-primary"
                                            type="submit"
                                            disabled={isCreating || isSaving || imgCompressing}>Submit {isCreating || isSaving || imgCompressing ? <Spinner animation="border" variant="light" size="sm" /> : null}</Button>
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
                                    <MapSelection
                                        setMapURL={url => this.setMapURL(url)}
                                        mapURL={mapURL}
                                        show={mapSelectShow}
                                        onHide={() => this.setMapSelectShow(false)}
                                    />
                                </Form>
                            )}
                    </Formik>
                </div>
            </Container>
        );
    }
}

PvmBuilder.propTypes = {
    pvmReducer: PropTypes.object,
    setPvmType: PropTypes.func,
    getPvmSingle: PropTypes.func,
    createPvm: PropTypes.func,
    editPvm: PropTypes.func
};

const mapStateToProps = state => {
    return {
        pvmReducer: state.pvmReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ setPvmType, getPvmSingle, createPvm, editPvm }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PvmBuilder);