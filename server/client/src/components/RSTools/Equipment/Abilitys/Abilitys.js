/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Collapse, Container, Form, FormControl, Image, InputGroup, ListGroup, Modal, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { EQUIPMENT_CONSTS } from 'consts/RSTools_Consts';
import PropTypes from 'prop-types';
import './Abilitys.scss';

class Abilitys extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            filterStyle: 0,
            showConfirm: false
        }
    }

    componentDidMount() {

    }

    setSearch = e => {
        this.setState({ search: e.target.value });
    }

    render() {
        const { search } = this.state;
        const { searchAbilitys, isSearching } = this.props.equipmentReducer;

        const searchResults = searchAbilitys
            .filter(bar => search === '' || bar.name.includes(search))
            .map((abilityBar, i) =>
                <ListGroup.Item key={i}>
                    {abilityBar.name}
                    {/* <span className="actions">
                        {item.isOwner ?
                            <>
                                <FaEdit className="action-icon edit" onClick={() => this.setEditItemShow(true, item._id)} />
                                <FaTrash className="action-icon delete" onClick={() => this.setShowConfirm(true, item._id)} />
                            </>
                            :
                            <>
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Can only edit items YOU made.</Tooltip>}>
                                    <span className="d-inline-block disabled-action">
                                        <FaEdit disabled style={{ pointerEvents: 'none' }} />
                                    </span>
                                </OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Can only delete items YOU made.</Tooltip>}>
                                    <span className="d-inline-block disabled-action">
                                        <FaTrash disabled style={{ pointerEvents: 'none' }} />
                                    </span>
                                </OverlayTrigger>
                            </>
                        }
                    </span> */}
                </ListGroup.Item>
            );

        return (
            <Container>
                <div className="Abilitys">
                    {/* {this.confirmModal()} */}
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
                                    <Button variant="button-primary">Add Ability Bar</Button>
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
                                value={2}
                                onChange={this.setFilter}
                            />
                        </Form.Group>
                    </Form>
                    <div className="spacer-h-3" />
                    {isSearching ?
                        <Spinner animation="border" variant="light" /> :
                        searchResults.length > 0 ?
                            <ListGroup variant="flush">
                                {searchResults}
                            </ListGroup> :
                            <p>No ability bars found...</p>
                    }
                    {/* <AddItem
                        show={addItemShow}
                        equipmentReducer={this.props.equipmentReducer}
                        createItem={data => this.props.createItem(data, filterSlots)}
                        clearErrors={() => this.props.clearErrors()}
                        onHide={() => this.setAddItemShow(false)}
                    />
                    <EditItem
                        show={editItemShow}
                        equipmentReducer={this.props.equipmentReducer}
                        editItem={data => this.props.editItem(data, filterSlots)}
                        clearErrors={() => this.props.clearErrors()}
                        onHide={() => this.setEditItemShow(false)}
                    /> */}
                </div>
            </Container>
        );
    }
}

Abilitys.propTypes = {
    equipmentReducer: PropTypes.object
};

const mapStateToProps = state => {
    return {
        equipmentReducer: state.equipmentReducer
    };
}

// const mapDispatchToProps = dispatch => bindActionCreators({ searchItems, getItemSingle, createItem, editItem, deleteItem, clearErrors }, dispatch);

export default connect(mapStateToProps, null)(Abilitys);