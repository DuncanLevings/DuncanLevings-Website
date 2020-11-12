/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Container, Form, FormControl, Image, InputGroup, ListGroup, Modal, Row, Spinner } from 'react-bootstrap';
import { getPresets, getPresetSingle, deletePreset } from 'store/actions/RSTools/presetActions';
import PresetOverview from '../PresetComponents/PresetOverview/PresetOverview.lazy';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './Presets.scss';

class Presets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            viewPreset: false,
            showConfirm: false,
            selectedPresetId: null
        }
    }

    componentDidMount() {
        this.props.getPresets();
    }

    navigate = (route, bool = false, presetId = null) => {
        this.props.history.push({
            pathname: route,
            state: { 
                editMode: bool,
                presetId: presetId
            }
        });
    }

    setSearch = e => {
        this.setState({ search: e.target.value });
    }

    setViewPreset = (bool, presetId = null) => {
        this.setState({ viewPreset: bool });

        if (presetId) this.props.getPresetSingle(presetId);
    }

    viewPresetModal = () => {
        const { viewPreset } = this.state;
        const { editPresetObj, isFetchingSingle } = this.props.presetReducer;

        return (
            <Modal
                show={viewPreset}
                onHide={() => this.setViewPreset(false)}
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="preset-modal text"
                centered
            >
                <Modal.Header>
                    <Modal.Title>{editPresetObj ? editPresetObj.name : 'View Preset'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!editPresetObj || isFetchingSingle ? <Spinner animation="border" variant="dark" />
                        :
                        <PresetOverview
                            equipSlotData={editPresetObj.equipSlotData}
                        />
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="button-secondary" onClick={() => this.setViewPreset(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    editSelected = (presetId) => {
        this.navigate(RSTOOL_ROUTES.PRESET_BUILDER, true, presetId);
    }

    setShowConfirm = (bool, presetId = null) => {
        this.setState({
            showConfirm: bool,
            selectedPresetId: presetId ? presetId : this.state.selectedPresetId
        });
    }

    deletePreset = () => {
        this.props.deletePreset(this.state.selectedPresetId)
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

    render() {
        const { search } = this.state;
        const { presets, isFetching } = this.props.presetReducer;

        const results = presets
            .filter(preset => search === '' || preset.name.includes(search))
            .map((preset, i) =>
                <ListGroup.Item key={i}>
                    <Row>
                        <Col xs={1}>
                            <span className="actions">
                                <FaEye className="action-icon edit" onClick={() => this.setViewPreset(true, preset._id)} />
                            </span>
                        </Col>
                        <Col xs={3}>
                            {preset.name}
                        </Col>
                        <Col xs={3}>
                            {preset.equipSlotData.length > 0 ? <Image src={"/static_images/RSTools/equipment_icon.png"} /> : null}
                            {/* {preset.inventorySlotData.length > 0 ? <Image src={"/static_images/RSTools/inventory_icon.png"} /> : null} */}
                            {/* {preset.familiar ? <Image src={"/static_images/RSTools/familiar_icon.png"} /> : null} */}
                            {/* {preset.abilityBarData.length > 0 ? <Image src={"/static_images/RSTools/abilitys_icon.png"} /> : null} */}
                            {/* {preset.prayerData.length > 0 ? <Image src={"/static_images/RSTools/prayer_icon.png"} /> : null} */}
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
            <Container>
                <div className="Presets">
                    {this.viewPresetModal()}
                    {this.confirmModal()}
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
                                    <Button variant="button-primary" onClick={() => this.navigate(RSTOOL_ROUTES.PRESET_BUILDER)}>Add Preset</Button>
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
            </Container>

        );
    }
}

Presets.propTypes = {
    presetReducer: PropTypes.object,
    getPresets: PropTypes.func,
    getPresetSingle: PropTypes.func,
    deletePreset: PropTypes.func
};

const mapStateToProps = state => {
    return {
        presetReducer: state.presetReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getPresets, getPresetSingle, deletePreset }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Presets));