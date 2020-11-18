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
import { getFarmRun, createFarmRun, editFarmRun, clearError } from 'store/actions/RSTools/farmRunActions';
import { Button, Col, Container, Form, FormControl, Image, InputGroup, ListGroup, Modal, Row, Spinner } from 'react-bootstrap';
import { FaCheckSquare, FaEdit, FaImage, FaPlus, FaTrash } from 'react-icons/fa';
import { FARM_CONSTS, RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import { farmRunAllSchema, farmRunSchema } from 'components/helpers/formValidation';
import { ErrorMessage, Field, FieldArray, Formik } from 'formik';
import PresetOverview from 'components/RSTools/Equipment/PresetComponents/PresetOverview/PresetOverview.lazy';
import ImgCrop from 'components/tools/ImgCrop/ImgCrop.lazy';
import ImgPreview from 'components/tools/ImgPreview/ImgPreview.lazy';
import PropTypes from 'prop-types';
import './FarmRunBuilder.scss';

class FarmRunBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            farmRunObj: null,
            search: '',
            farmType: -1,
            presetSet: false,
            pressingMissing: false,
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
        this.props.clearError();
        if (this.checkEditMode()) {
            if (this.props.farmRunReducer.farmRun) {
                this.setEdit();
            } else {
                this.props.getFarmRun(this.props.match.params.farmType);
            }
        } else {
            this.setState({ farmType: this.props.match.params.farmType });
        }

        if (this.props.presetReducer.savedPreset) {
            this.setState({
                preset: this.props.presetReducer.savedPreset,
                presetSet: true
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.farmRunReducer.farmRun !== prevProps.farmRunReducer.farmRun) {
            if (this.checkEditMode()) {
                if (this.props.farmRunReducer.farmRun) {
                    this.setEdit();
                }
            }
        }
    }

    setEdit = () => {
        const data = this.props.farmRunReducer.farmRun;

        const stepArray = [];
        for (const step of data.steps) {
            const stepData = {
                title: step.title,
                step: step.step,
                img: {
                    url: step.url
                }
            }

            if (step.type) stepData.type = step.type;

            stepArray.push(stepData);
        }
        data.steps = stepArray;

        this.setState({
            farmType: this.props.match.params.farmType,
            presetSet: true,
            farmRunObj: data,
            preset: this.props.presetReducer.savedPreset ? null : data.preset
        });
    }

    checkEditMode = () => {
        return this.props.location.state && this.props.location.state.editMode;
    }

    checkFrom = () => {
        return this.props.location.state && this.props.location.state.from;
    }

    navigateUseEmpty = (route) => {
        const { pathname } = this.props.location;

        this.props.history.push({
            pathname: route,
            state: {
                activityUseEmpty: true,
                from: pathname,
                activityEditMode: this.checkEditMode(),
                activityFrom: this.props.location.state.from || null
            }
        });
    }

    navigateAddPreset = (route) => {
        const { pathname } = this.props.location;

        this.props.history.push({
            pathname: route,
            state: {
                activityAddPreset: true,
                from: pathname,
                activityEditMode: this.checkEditMode(),
                activityFrom: this.props.location.state.from || null
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
                presetId: presetId,
                activityEditMode: this.checkEditMode(),
                activityFrom: this.props.location.state.from || null
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
                editMode: true,
                activityEditMode: this.checkEditMode(),
                activityFrom: this.props.location.state.from || null
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
            pressingMissing: false,
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
                    <ListGroup.Item key={i} className="preset-list-group-item">
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
            pressingMissing: false,
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

    setImgCropShow = (bool, i) => {
        this.setState({
            imgCropShow: bool,
            selectedStep: i === undefined ? this.state.selectedStep : i
        });
    }

    setPreviewImgShow = (bool, i, img) => {
        this.setState({
            imgPreviewShow: bool,
            selectedStep: i === undefined ? this.state.selectedStep : i,
            imgPreviewURL: img === undefined ? "" : img
        });
    }

    addStep = (field, values, setValues) => e => {
        const { farmType } = this.state;
        const steps = [...values.steps];
        const step = { title: '', step: '', img: '', type: '' };
        if (farmType === '0') step.type = '';
        steps.push(step);
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

    getInitalValues = () => {
        const { farmType, farmRunObj } = this.state;

        if (this.checkEditMode()) {
            if (farmType === '0') {
                return {
                    webURL: farmRunObj.webURL || '',
                    youtubeURL: farmRunObj.youtubeURL || '',
                    notes: farmRunObj.notes || '',
                    hide: farmRunObj.hidden || ["0"],
                    steps: farmRunObj.steps || [{ title: '', step: '', img: {}, type: '' }]
                }
            }
            return {
                webURL: farmRunObj.webURL || '',
                youtubeURL: farmRunObj.youtubeURL || '',
                notes: farmRunObj.notes || '',
                steps: farmRunObj.steps || [{ title: '', step: '', img: {} }]
            }
        } else {
            if (farmType === '0') {
                return {
                    webURL: '',
                    youtubeURL: '',
                    notes: '',
                    hide: ["0"],
                    steps: [{ title: '', step: '', img: {}, type: '' }]
                }
            }

            return {
                webURL: '',
                youtubeURL: '',
                notes: '',
                steps: [{ title: '', step: '', img: {} }]
            }
        }
    }

    submit = values => {
        const { farmType, farmRunObj, preset } = this.state;
        if (!preset) return this.setState({ pressingMissing: true });
        this.setState({ pressingMissing: false });

        let formData = new FormData();

        if (this.checkEditMode()) formData.append('farmRunId', farmRunObj._id);
        formData.append('preset', JSON.stringify(preset));
        formData.append('type', farmType);
        if (farmType === '0') formData.append('hidden', values.hide);
        formData.append('webURL', values.webURL);
        formData.append('youtubeURL', values.youtubeURL);
        formData.append('notes', values.notes);

        values.steps.forEach((step, i) => {
            if (this.checkEditMode()) {
                let stepData = {
                    title: step.title,
                    step: step.step,
                    url: step.img.url && step.img.url.split(':')[0] !== "blob" ? step.img.url : null
                };
                if (step.type) stepData.type = step.type;
                formData.append('steps', JSON.stringify(stepData));
            } else {
                formData.append('titles', step.title);
                formData.append('steps', step.step);
                if (step.type) formData.append('types', step.type);
            }

            if (step.img.blob) {
                formData.append('images', step.img.blob, `step_${i}`);
                window.URL.revokeObjectURL(step.img.url);
            }
        });

        let from = RSTOOL_ROUTES.FARMRUNS;
        if (this.checkFrom()) from = this.props.location.state.from;
        if (this.checkEditMode()) {
            this.props.editFarmRun(formData, from);
        } else {
            this.props.createFarmRun(formData, from);
        }
    }

    render() {
        const { farmType, presetSet, pressingMissing, useExistingPreset, imgCropShow, imgPreviewShow, imgPreviewURL } = this.state;
        const { isFetching, isCreating, isSaving, error } = this.props.farmRunReducer;

        if (isFetching) {
            return (
                <div className="FarmRunBuilder">
                    <Spinner animation="border" variant="light" />
                </div>
            );
        }

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
                    <div className="farm-error">
                        <p>{error}</p>
                        {pressingMissing ?
                            <p>Must setup a preset!</p>
                            : null}
                    </div>
                    {farmType > -1 ?
                        <Formik
                            validationSchema={farmType === '0' ? farmRunAllSchema : farmRunSchema}
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
                                        {farmType === '0' ?
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
                                        <FieldArray name="steps">
                                            {() => (values.steps.map((step, i) => {
                                                const stepErrors = (errors.steps?.length && errors.steps[i]) || {};
                                                const stepTouched = (touched.steps?.length && touched.steps[i]) || {};
                                                return (
                                                    <ListGroup variant="flush" key={i}>
                                                        <ListGroup.Item className="step-list-item">
                                                            <Form.Row>
                                                                <Col>
                                                                    <Form.Group>
                                                                        <InputGroup>
                                                                            <InputGroup.Prepend>
                                                                                <InputGroup.Text>Step {i + 1}:</InputGroup.Text>
                                                                                {farmType === '0' ?
                                                                                    <Field
                                                                                        as="select"
                                                                                        name={`steps.${i}.type`}
                                                                                        className={'form-control' + (stepErrors.type && stepTouched.type ? ' is-invalid' : '')}
                                                                                    >
                                                                                        <option value={''}>None</option>
                                                                                        <option value={FARM_CONSTS.farmTypes.HERB}>Herb</option>
                                                                                        <option value={FARM_CONSTS.farmTypes.TREE}>Tree</option>
                                                                                        <option value={FARM_CONSTS.farmTypes.FRUIT}>Fruit</option>
                                                                                        <option value={FARM_CONSTS.farmTypes.BUSH}>Bush</option>
                                                                                        <option value={FARM_CONSTS.farmTypes.CACTUS}>Cactus</option>
                                                                                        <option value={FARM_CONSTS.farmTypes.MUSHROOM}>Mushroom</option>
                                                                                    </Field>
                                                                                    : null}
                                                                            </InputGroup.Prepend>
                                                                            <Field name={`steps.${i}.title`} type="text" placeholder="title..." className={'form-control' + (stepErrors.title && stepTouched.title ? ' is-invalid' : '')} />
                                                                            <Field name={`steps.${i}.step`} type="text" placeholder="step details..." className={'form-control' + (stepErrors.step && stepTouched.step ? ' is-invalid' : '')} />
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
                                                                            {farmType === '0' ?
                                                                                <ErrorMessage name={`steps.${i}.type`} component="div" className="invalid-feedback" />
                                                                                : null}
                                                                            <ErrorMessage name={`steps.${i}.title`} component="div" className="invalid-feedback" />
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
                                        <div className="farm-submit">
                                            <Form.Group controlId="formAddStep">
                                                <Field name="stepTotal">
                                                    {({ field }) => (
                                                        <Button {...field} variant="button-primary" onClick={this.addStep(field, values, setValues)}><FaPlus /> Add Step</Button>
                                                    )}
                                                </Field>
                                            </Form.Group>
                                        </div>
                                        <hr className="divider" />
                                        <div className="farm-submit">
                                            <Button
                                                variant="button-primary"
                                                type="submit"
                                                disabled={isCreating || isSaving}>Submit {isCreating || isSaving ? <Spinner animation="border" variant="light" size="sm" /> : null}</Button>
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
                        :
                        <Spinner animation="border" variant="dark" />
                    }
                </div>
            </Container>
        );
    }
}

FarmRunBuilder.propTypes = {
    presetReducer: PropTypes.object,
    farmRunReducer: PropTypes.object,
    getPresets: PropTypes.func,
    getPresetSingle: PropTypes.func,
    deletePreset: PropTypes.func,
    clearPreset: PropTypes.func,
    getFarmRun: PropTypes.func,
    createFarmRun: PropTypes.func,
    editFarmRun: PropTypes.func,
    clearError: PropTypes.func
};

const mapStateToProps = state => {
    return {
        presetReducer: state.presetReducer,
        farmRunReducer: state.farmRunReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getPresets, getPresetSingle, deletePreset, clearPreset, getFarmRun, createFarmRun, editFarmRun, clearError }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FarmRunBuilder));