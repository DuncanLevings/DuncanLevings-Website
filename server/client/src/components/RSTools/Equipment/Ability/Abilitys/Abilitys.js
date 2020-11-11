/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Collapse, Container, Form, FormControl, Image, InputGroup, ListGroup, Modal, OverlayTrigger, Row, Spinner, Tooltip } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { EQUIPMENT_CONSTS } from 'consts/RSTools_Consts';
import { getAbilityBarSingle, searchAbilityBars, createAbilityBar, editAbilityBar, deleteAbilityBar } from 'store/actions/RSTools/equipmentActions';
import AddAbilityBar from '../AddAbilityBar/AddAbilityBar.lazy';
import EditAbilityBar from '../EditAbilityBar/EditAbilityBar.lazy';
import PropTypes from 'prop-types';
import './Abilitys.scss';

class Abilitys extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            filterStyle: 0,
            addAbilityBarShow: false,
            editAbilityBarShow: false,
            showConfirm: false
        }
    }

    componentDidMount() {
        this.props.searchAbilityBars(this.state.filterStyle);
    }

    setAddAbilityBarShow = (bool) => {
        this.setState({ addAbilityBarShow: bool });
    }

    setSearch = e => {
        this.setState({ search: e.target.value });
    }

    setFilter = e => {
        this.setState({ filterStyle: e.target.value });
        this.props.searchAbilityBars(e.target.value);
    }

    setShowConfirm = (bool, abilityBarId = null) => {
        this.setState({
            showConfirm: bool,
            selectedAbilityBarId: abilityBarId ? abilityBarId : this.state.selectedAbilityBarId
        });
    }

    deleteAbilityBar = () => {
        this.props.deleteAbilityBar(this.state.selectedAbilityBarId, this.state.filterStyle)
        this.setState({ showConfirm: false });
    }

    setEditAbilityBarShow = (bool, abilityBarId = null) => {
        this.setState({ editAbilityBarShow: bool });
        if (abilityBarId) this.props.getAbilityBarSingle(abilityBarId);
    }

    confirmModal = () => {
        const { showConfirm } = this.state;

        return (
            <Modal
                show={showConfirm}
                onHide={() => this.setShowConfirm(false)}
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="confirm-modal text"
                centered
            >
                <Modal.Header>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you wish to delete this ability bar?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="button-secondary" onClick={() => this.setShowConfirm(false)}>Cancel</Button>
                    <Button variant="button-warning" onClick={() => this.deleteAbilityBar()}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    render() {
        const { search, addAbilityBarShow, editAbilityBarShow, filterStyle } = this.state;
        const { searchAbilityBars, isSearching } = this.props.equipmentReducer;

        const searchResults = searchAbilityBars
            .filter(bar => search === '' || bar.name.includes(search))
            .map((bar, i) =>
                <ListGroup.Item key={i}>
                    <Row>
                        <Col xs={2}>{bar.name}</Col>
                        <Col>
                            {bar.abilityBar.map((ability, i) =>
                                <OverlayTrigger
                                    key={i}
                                    placement="top"
                                    delay={{ show: 500, hide: 250 }}
                                    overlay={<Tooltip id="tooltip-disabled">{ability.name}</Tooltip>}
                                >
                                    <Image className="style-img" src={ability.image} />
                                </OverlayTrigger>
                            )}
                        </Col>
                        <Col xs={2}>
                            <span className="actions">
                                <FaEdit className="action-icon edit" onClick={() => this.setEditAbilityBarShow(true, bar._id)} />
                                <FaTrash className="action-icon delete" onClick={() => this.setShowConfirm(true, bar._id)} />
                            </span>
                        </Col>
                    </Row>
                </ListGroup.Item>
            );

        return (
            <Container>
                <div className="Abilitys">
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
                                    <Button variant="button-primary" onClick={() => this.setAddAbilityBarShow(true)}>Add Ability Bar</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="formOptions">
                            <Form.Check
                                type="radio"
                                label={<span><Image className="style-img" src="/static_images/RSTools/styles/all_style.png" /> All Styles</span>}
                                name="formSearchOptions"
                                id="allStyles"
                                value={0}
                                onChange={this.setFilter}
                                defaultChecked
                            />
                            <Form.Check
                                type="radio"
                                label={<span><Image className="style-img" src="/static_images/RSTools/styles/melee.png" /> Melee</span>}
                                name="formSearchOptions"
                                id="melee"
                                value={1}
                                onChange={this.setFilter}
                            />
                            <Form.Check
                                type="radio"
                                label={<span><Image className="style-img" src="/static_images/RSTools/styles/range.png" /> Range</span>}
                                name="formSearchOptions"
                                id="range"
                                value={2}
                                onChange={this.setFilter}
                            />
                            <Form.Check
                                type="radio"
                                label={<span><Image className="style-img" src="/static_images/RSTools/styles/magic.png" /> Magic</span>}
                                name="formSearchOptions"
                                id="magic"
                                value={3}
                                onChange={this.setFilter}
                            />
                        </Form.Group>
                    </Form>
                    <div className="spacer-h-3" />
                    {isSearching ?
                        <Spinner animation="border" variant="light" /> :
                        searchResults.length > 0 ?
                            <ListGroup variant="flush" className="scrollable-list">
                                {searchResults}
                            </ListGroup> :
                            <p>No ability bars found...</p>
                    }
                    <AddAbilityBar
                        show={addAbilityBarShow}
                        equipmentReducer={this.props.equipmentReducer}
                        createAbilityBar={data => this.props.createAbilityBar(data, filterStyle)}
                        onHide={() => this.setAddAbilityBarShow(false)}
                    />
                    <EditAbilityBar
                        show={editAbilityBarShow}
                        equipmentReducer={this.props.equipmentReducer}
                        editAbilityBar={data => this.props.editAbilityBar(data, filterStyle)}
                        onHide={() => this.setEditAbilityBarShow(false)}
                    />
                </div>
            </Container>
        );
    }
}

Abilitys.propTypes = {
    equipmentReducer: PropTypes.object,
    getAbilityBarSingle: PropTypes.func,
    searchAbilityBars: PropTypes.func,
    createAbilityBar: PropTypes.func,
    editAbilityBar: PropTypes.func,
    deleteAbilityBar: PropTypes.func
};

const mapStateToProps = state => {
    return {
        equipmentReducer: state.equipmentReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getAbilityBarSingle, searchAbilityBars, createAbilityBar, editAbilityBar, deleteAbilityBar }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Abilitys);