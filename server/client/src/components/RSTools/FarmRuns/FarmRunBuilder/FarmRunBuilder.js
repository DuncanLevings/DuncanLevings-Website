/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPresets, getPresetSingle, deletePreset, clearPreset } from 'store/actions/RSTools/presetActions';
import { Button, Col, Container, Form, FormControl, Image, InputGroup, ListGroup, Modal, Row, Spinner } from 'react-bootstrap';
import { FaCheckSquare, FaEdit, FaTrash } from 'react-icons/fa';
import { FARM_CONSTS, RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import { farmRunSchema } from 'components/helpers/formValidation';
import { Formik } from 'formik';
import PresetOverview from 'components/RSTools/Equipment/PresetComponents/PresetOverview/PresetOverview.lazy';
import ImgCrop from 'components/tools/ImgCrop/ImgCrop.lazy';
import ImgPreview from 'components/tools/ImgPreview/ImgPreview.lazy';
import PropTypes from 'prop-types';
import './FarmRunBuilder.scss';


class FarmRunBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            farmType: -1,
            presetSet: false,
            useExistingPreset: false,
            showConfirm: false,
            selectedPresetId: null,
            preset: null,
            imgCropShow: false,
            imgPreviewShow: false,
            imgPreviewURL: "",
            selectedStep: 0
        }
    }

    componentDidMount() {
        this.setState({ farmType: this.props.match.params.farmType });
        if (this.props.presetReducer.savedPreset) {
            this.setState({
                preset: this.props.presetReducer.savedPreset,
                presetSet: true
            });
        }
    }

    navigateUseEmpty = (route) => {
        const { pathname } = this.props.location;

        this.props.history.push({
            pathname: route,
            state: {
                activityUseEmpty: true,
                from: pathname
            }
        });
    }

    navigateAddPreset = (route) => {
        const { pathname } = this.props.location;

        this.props.history.push({
            pathname: route,
            state: {
                activityAddPreset: true,
                from: pathname
            }
        });
    }

    navigateEditExistingPreset = (route, presetId) => {
        const { pathname } = this.props.location;

        this.props.history.push({
            pathname: route,
            state: {
                activityEditExisting: true,
                from: pathname,
                editMode: true,
                presetId: presetId
            }
        });
    }

    navigateEditPreset = (route, presetObj) => {
        const { pathname } = this.props.location;

        this.props.history.push({
            pathname: route,
            state: {
                preset: presetObj,
                activityEdit: true,
                from: pathname,
                editMode: true
            }
        });
    }

    setSearch = e => {
        this.setState({ search: e.target.value });
    }

    setUseExisting = (bool) => {
        this.setState({ useExistingPreset: bool });
        if (bool) this.props.getPresets();
    }

    setExistingPreset = (preset) => {
        this.setState({
            preset: preset,
            useExistingPreset: false,
            presetSet: true
        });
    }

    generateSelectPreset = () => {
        const { search, useExistingPreset } = this.state;
        const { presets, isFetching } = this.props.presetReducer;

        if (useExistingPreset) {
            const results = presets
                .filter(preset => search === '' || preset.name.includes(search))
                .map((preset, i) =>
                    <ListGroup.Item key={i}>
                        <Row>
                            <Col xs={1}>
                                <span className="actions">
                                    <FaCheckSquare className="action-icon add" onClick={() => this.setExistingPreset(preset)} />
                                </span>
                            </Col>
                            <Col xs={3}>
                                {preset.name}
                            </Col>
                            <Col xs={3}>
                                {preset.equipSlotData.length > 0 ? <Image src={"/static_images/RSTools/equipment_icon.png"} /> : null}
                                {preset.inventorySlotData.length > 0 ? <Image src={"/static_images/RSTools/inventory_icon.png"} /> : null}
                                {preset.familiar ? <Image src={"/static_images/RSTools/familiar_icon.png"} /> : null}
                                {preset.abilityBarData.length > 0 ? <Image src={"/static_images/RSTools/abilitys_icon.png"} /> : null}
                                {preset.prayerData.length > 0 ? <Image src={"/static_images/RSTools/prayer_icon.png"} /> : null}
                            </Col>
                            <Col>
                                <span className="actions">
                                    <FaEdit className="action-icon edit" onClick={() => this.editSelected(preset._id)} />
                                    <FaTrash className="action-icon delete" onClick={() => this.setShowConfirm(true, preset._id)} />
                                </span>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                );

            return (
                <div>
                    <div className="spacer-h-3" />
                    <Form>
                        <Form.Group controlId="formSearch">
                            <InputGroup>
                                <FormControl
                                    placeholder="Search..."
                                    aria-label="search"
                                    aria-describedby="search"
                                    onChange={this.setSearch}
                                />
                                <InputGroup.Append>
                                    <Button variant="button-primary" onClick={() => this.navigateAddPreset(RSTOOL_ROUTES.PRESET_BUILDER)}>Add Preset</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                    {isFetching ?
                        <Spinner animation="border" variant="light" /> :
                        results.length > 0 ?
                            <ListGroup variant="flush" className="scrollable-list">
                                {results}
                            </ListGroup> :
                            <p>No presets found...</p>
                    }
                </div>
            );
        }
    }

    changePreset = () => {
        this.setState({
            presetSet: false,
            preset: null
        });
        this.props.clearPreset();
    }

    showPreset = () => {
        const { presetSet, preset } = this.state;

        if (presetSet && preset) {
            return (
                <div>
                    <div className="select-preset-container">
                        <Button variant="button-secondary" onClick={() => this.changePreset(false)}>Change Preset</Button>
                        <div className="spacer-h-2" />
                        <Button variant="button-secondary" onClick={() => this.navigateEditPreset(RSTOOL_ROUTES.PRESET_BUILDER, preset)}>Edit</Button>
                    </div>
                    <div className="spacer-h-2" />
                    <PresetOverview
                        equipSlotData={preset.equipSlotData}
                        inventorySlotData={preset.inventorySlotData}
                        familiar={preset.familiar}
                        familiarSlotData={preset.familiarSlotData}
                        abilityBarData={preset.abilityBarData}
                        prayerData={preset.prayerData}
                    />
                </div>
            )
        }
    }

    editSelected = (presetId) => {
        this.navigateEditExistingPreset(RSTOOL_ROUTES.PRESET_BUILDER, presetId);
    }

    setShowConfirm = (bool, presetId = null) => {
        this.setState({
            showConfirm: bool,
            selectedPresetId: presetId ? presetId : this.state.selectedPresetId
        });
    }

    deletePreset = () => {
        this.props.deletePreset(this.state.selectedPresetId);
        this.setState({ showConfirm: false });
    }

    confirmModal = () => {
        const { showConfirm } = this.state;

        return (
            <Modal
                show={showConfirm}
                onHide={() => this.setShowConfirm(false)}
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="preset-modal text"
                centered
            >
                <Modal.Header>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you wish to delete this preset?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="button-secondary" onClick={() => this.setShowConfirm(false)}>Cancel</Button>
                    <Button variant="button-warning" onClick={() => this.deletePreset()}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    submit = values => {
        console.log(values)
        // let formData = new FormData();

        // formData.append('title', values.title);
        // formData.append('type', this.props.dailyReducer.dailyType);

        // values.steps.forEach((step, i) => {
        //     formData.append('steps', step.step);

        //     if (step.img.blob) {
        //         formData.append('images', step.img.blob, `step_${i}`);
        //         window.URL.revokeObjectURL(step.img.url);
        //     }
        // });

        // this.props.createDaily(formData);
    }

    render() {
        const { farmType, presetSet, useExistingPreset, imgCropShow, imgPreviewShow, imgPreviewURL } = this.state;
        console.log(farmType)
        return (
            <Container>
                <div className="FarmRunBuilder">
                    <div className="farm-header">
                        <h3>{FARM_CONSTS.farmTypeNames[farmType]} Builder</h3>
                    </div>
                    {this.confirmModal()}
                    {!presetSet ?
                        <div className="select-preset-container">
                            <Button variant="button-primary" disabled={useExistingPreset} onClick={() => this.setUseExisting(true)}>Select a Preset</Button>
                            <div className="spacer-h-2" />
                            <Button variant="button-primary" onClick={() => this.navigateUseEmpty(RSTOOL_ROUTES.PRESET_BUILDER)}>Use Empty Preset</Button>
                        </div>
                        : null}
                    {this.generateSelectPreset()}
                    {this.showPreset()}
                    <hr className="divider" />
                    {/* <div className="farm-error">
                        <p>{error}</p>
                    </div> */}
                    <Formik
                        validationSchema={farmRunSchema}
                        onSubmit={this.submit}
                        initialValues={{
                            webURL: '',
                            youtubeURL: '',
                            notes: '',
                            hide: ["0"]
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
                                    <Form.Group controlId="formWeb">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Web Guide (optional):</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                name="webURL"
                                                placeholder="Web site url..."
                                                aria-label="webURL"
                                                aria-describedby="webURL"
                                                value={values.webURL}
                                                onChange={handleChange}
                                                isInvalid={touched.webURL && !!errors.webURL}
                                                autoFocus
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.webURL}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="formYoutube">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Youtube Guide (optional):</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                name="youtubeURL"
                                                placeholder="Web site url..."
                                                aria-label="youtubeURL"
                                                aria-describedby="youtubeURL"
                                                value={values.youtubeURL}
                                                onChange={handleChange}
                                                isInvalid={touched.youtubeURL && !!errors.youtubeURL}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.youtubeURL}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="formNotes">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Notes (optional):</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                as="textarea"
                                                name="notes"
                                                placeholder="Notes..."
                                                aria-label="notes"
                                                aria-describedby="notes"
                                                value={values.notes}
                                                onChange={handleChange}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    {farmType == 0 ?
                                        <Form.Group controlId="formHide">
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text>Hide Category(s):</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl
                                                    as="select"
                                                    multiple
                                                    name="hide"
                                                    aria-label="hide"
                                                    aria-describedby="hide"
                                                    value={values.hide}
                                                    onChange={handleChange}
                                                >
                                                    <option value={FARM_CONSTS.farmTypes.ALL}>None</option>
                                                    <option value={FARM_CONSTS.farmTypes.HERB}>Herb</option>
                                                    <option value={FARM_CONSTS.farmTypes.TREE}>Tree</option>
                                                    <option value={FARM_CONSTS.farmTypes.FRUIT}>Fruit</option>
                                                    <option value={FARM_CONSTS.farmTypes.BUSH}>Bush</option>
                                                    <option value={FARM_CONSTS.farmTypes.CACTUS}>Cactus</option>
                                                    <option value={FARM_CONSTS.farmTypes.MUSHROOM}>Mushroom</option>
                                                </FormControl>
                                            </InputGroup>
                                        </Form.Group>
                                        : null}
                                    <hr className="divider" />
                                    {/* <FieldArray name="steps">
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
                                    </Form.Group> */}
                                    <hr className="divider" />
                                    <div className="farm-submit">
                                        <Button
                                            variant="button-primary"
                                            type="submit"
                                            disabled={false}>Submit {false ? <Spinner animation="border" variant="light" size="sm" /> : null}</Button>
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

FarmRunBuilder.propTypes = {
    presetReducer: PropTypes.object,
    getPresets: PropTypes.func,
    getPresetSingle: PropTypes.func,
    deletePreset: PropTypes.func,
    clearPreset: PropTypes.func
};

const mapStateToProps = state => {
    return {
        presetReducer: state.presetReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getPresets, getPresetSingle, deletePreset, clearPreset }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FarmRunBuilder));