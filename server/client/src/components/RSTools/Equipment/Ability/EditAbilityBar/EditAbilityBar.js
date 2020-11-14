/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Button, Dropdown, DropdownButton, Form, FormControl, Image, InputGroup, Modal, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { EQUIPMENT_CONSTS } from 'consts/RSTools_Consts';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Formik } from 'formik';
import { abilitySchema } from 'components/helpers/formValidation';
import PropTypes from 'prop-types';
import './EditAbilityBar.scss';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 6;

const getItemStyle = (draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    marginRight: 4,

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyleMain = (isDraggingOver) => ({
    background: isDraggingOver ? "#55b874" : "#c1deee",
    display: "flex",
    padding: grid,
    overflow: "auto",
    height: 44
});

const getListStyle = () => ({
    background: "#e9ecef",
    display: "flex",
    padding: grid,
    overflow: "auto"
});

class EditAbilityBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editAbilityBarObj: null,
            style: null,
            abilityData: EQUIPMENT_CONSTS.abilityData,
            abilityBar: [],
            basics: null,
            thresholds: null,
            ultimates: null,
            lengthError: false,
            duplicateError: false,
            droppableListIds: {
                droppable: 'abilityBar',
                droppable1: 'basics',
                droppable2: 'thresholds',
                droppable3: 'ultimates'
            },
            showUpdateAll: false
        }
    }

    componentDidMount() {
        if (this.props.editFromPreset) this.setState({ abilityBar: this.props.barSlots });
    }

    componentDidUpdate(prevProps) {
        if (this.props.equipmentReducer.editAbilityBarObj !== prevProps.equipmentReducer.editAbilityBarObj) {
            if (this.props.editFromPreset) this.setState({ abilityBar: this.props.barSlots });
            else if (this.props.equipmentReducer.editAbilityBarObj) this.setState({ abilityBar: this.props.equipmentReducer.editAbilityBarObj.abilityBar });
        }

        if (this.props.equipmentReducer.searchAbilityBars !== prevProps.equipmentReducer.searchAbilityBars) {
            if (!this.props.editFromPreset) {
                this.setState({
                    style: null,
                    abilityBar: []
                });
            }

            this.props.onHide();
        }
    }

    uniqueAbilityList = (key, type) => {
        const { abilityData, abilityBar } = this.state;
        let data = abilityData[key][type];
        return data.filter(val => !abilityBar.some(d => d.id === val.id));
    }

    handleStyleSelect = key => {
        this.setState({
            style: key,
            basics: this.uniqueAbilityList(key, "basics"),
            thresholds: this.uniqueAbilityList(key, "thresholds"),
            ultimates: this.uniqueAbilityList(key, "ultimates"),
            abilitysRequired: false
        });
    }

    getList = id => this.state[this.state.droppableListIds[id]];

    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId && source.droppableId === 'droppable') {
            // clear error
            this.setState({ lengthError: false, duplicateError: false });

            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            const listType = this.state.droppableListIds[destination.droppableId];
            let state = { [listType]: items };

            this.setState(state);
        } else {
            if (source.droppableId !== 'droppable' && destination.droppableId !== 'droppable') return;

            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            // ensure ability bar limit of 14 abilitys
            if (destination.droppableId === 'droppable' &&
                result[destination.droppableId].length > 14) {
                this.setState({ lengthError: true });
                return;
            } else {
                this.setState({ lengthError: false });
            }

            this.setState({
                [this.state.droppableListIds[source.droppableId]]: result[source.droppableId],
                [this.state.droppableListIds[destination.droppableId]]: result[destination.droppableId]
            });
        }
    };

    checkIfArrayIsUnique = myArray => {
        return myArray.length === new Set(myArray).size;
    }

    createList = (type, droppable) => {
        return (
            <Droppable droppableId={droppable} direction="horizontal">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={type === 'abilityBar' ? getListStyleMain(snapshot.isDraggingOver) : getListStyle()}>
                        {this.state[type].map((ability, index) => (
                            <Draggable
                                key={ability.id}
                                draggableId={ability.id}
                                index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            provided.draggableProps.style
                                        )}>
                                        <OverlayTrigger
                                            key={index}
                                            placement="top"
                                            delay={{ show: 500, hide: 250 }}
                                            overlay={<Tooltip id="tooltip-disabled">{ability.name}</Tooltip>}
                                        >
                                            <Image className="style-img" src={ability.image} />
                                        </OverlayTrigger>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }

    setShowUpdateAll = (bool) => {
        this.setState({ showUpdateAll: bool });
    }

    submitData = (updateAll = false) => {
        this.setShowUpdateAll(false)
        const formData = this.state.formData;

        if (updateAll) {
            formData.append("updateAll", updateAll);
        }

        this.props.editAbilityBar(formData);
    }

    updateAllModal = () => {
        const { showUpdateAll } = this.state;

        return (
            <Modal
                show={showUpdateAll}
                onHide={() => this.setShowUpdateAll(false)}
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="confirm-modal text"
                centered
            >
                <Modal.Header>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Update all presets that use this ability bar?</p>
                    <p className="small-text">Note: Will only affect presets with an un-edited version of this ability bar</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="button-secondary" onClick={() => this.submitData(true)}>Yes</Button>
                    <Button variant="button-secondary" onClick={() => this.submitData()}>No</Button>
                    <Button variant="button-secondary" onClick={() => this.setShowUpdateAll(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    submitAbilityBar = values => {
        const { editAbilityBarObj } = this.props.equipmentReducer;

        if (this.state.abilityBar.length < 1) return this.setState({ abilitysRequired: true });
        else this.setState({ abilitysRequired: false });

        let formData = new FormData();

        formData.append('abilityBarId', editAbilityBarObj._id);
        formData.append('name', values.name);
        formData.append('styleType', values.styleType);
        formData.append('abilitys', JSON.stringify(this.state.abilityBar));

        if (this.props.editFromPreset) this.props.setBarSlots(this.state.abilityBar);

        this.setState({ formData: formData });
        this.setShowUpdateAll(true);

        // this.props.editAbilityBar(formData);
    }

    sendToPreset = () => {
        this.props.setBarSlots(this.state.abilityBar, true);
        this.props.onHide();
    }

    getInitialValues = () => {
        const { editAbilityBarObj } = this.props.equipmentReducer;
        const { editFromPreset, abilityBarFromPreset } = this.props;

        if (!editAbilityBarObj) return null;

        let values = {};
        if (editFromPreset && abilityBarFromPreset) {
            values = {
                name: abilityBarFromPreset.name,
                styleType: abilityBarFromPreset.styleType
            }
        } else {
            values = {
                name: editAbilityBarObj.name,
                styleType: editAbilityBarObj.styleType
            }
        }

        return values;
    }

    showAbilityBar = () => {
        const { abilityBar, style, lengthError, duplicateError } = this.state;
        const { editAbilityBarObj } = this.props.equipmentReducer;

        let droppable, droppable1, droppable2, droppable3 = null;
        if (editAbilityBarObj || abilityBar.length > 0) droppable = this.createList("abilityBar", "droppable");
        if (style) {
            droppable1 = this.createList("basics", "droppable1");
            droppable2 = this.createList("thresholds", "droppable2");
            droppable3 = this.createList("ultimates", "droppable3");
        }

        return (
            <div>
                <DropdownButton id="dropdown-style" title="Load Style" variant="button-secondary" onSelect={this.handleStyleSelect}>
                    <Dropdown.Item eventKey="melee"><span><Image className="style-img" src="/static_images/RSTools/styles/melee.png" /> Melee</span></Dropdown.Item>
                    <Dropdown.Item eventKey="range"><span><Image className="style-img" src="/static_images/RSTools/styles/range.png" /> Range</span></Dropdown.Item>
                    <Dropdown.Item eventKey="magic"><span><Image className="style-img" src="/static_images/RSTools/styles/magic.png" /> Magic</span></Dropdown.Item>
                    <Dropdown.Item eventKey="other"><span><Image className="style-img" src="/static_images/RSTools/styles/defence_abilities.png" /> Other</span></Dropdown.Item>
                </DropdownButton>
                <div className="spacer-h-2" />
                {
                    lengthError ?
                        <div className="ability-error">
                            Reached limit of a single ability bar!
                        </div>
                        : null
                }
                {
                    duplicateError ?
                        <div className="ability-error">
                            Cannot have duplicate abilitys!
                        </div>
                        : null
                }
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {droppable}
                    <br />
                    {style ?
                        <>
                            <p>Drag from below abilitys to your ability bar</p>
                            {droppable1}
                            <br />
                            {droppable2}
                            <br />
                            {droppable3}
                        </>
                        : null}
                </DragDropContext>
            </div>
        );
    }

    showSubmit = () => {
        const { editFromPreset, abilityBarFromPreset } = this.props;
        const { isSaving } = this.props.equipmentReducer;

        if (editFromPreset) {
            if (!abilityBarFromPreset) {
                return (
                    <div className="ability-button">
                        <Button className="presetSubmit" variant="button-primary" onClick={() => this.sendToPreset()}>Submit</Button>
                    </div>
                );
            }

            return (
                <div className="ability-button">
                    <Button className="presetSubmit" variant="button-primary" onClick={() => this.sendToPreset()}>Submit</Button>
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 250 }}
                        overlay={<Tooltip id="tooltip-disabled">Overwrite and save selected ability bar</Tooltip>}
                    >
                        <Button
                            variant="button-primary"
                            type="submit"
                            disabled={isSaving}>Submit Current {isSaving ? <Spinner animation="border" variant="light" size="sm" /> : null}
                        </Button>
                    </OverlayTrigger>
                </div>
            );
        }

        return (
            <div className="ability-button">
                <Button
                    variant="button-primary"
                    type="submit"
                    disabled={isSaving}>Submit {isSaving ? <Spinner animation="border" variant="light" size="sm" /> : null}
                </Button>
            </div >
        );
    }

    render() {
        const { editAbilityBar, clearAbilityBarObj, equipmentReducer, abilityBarFromPreset, editFromPreset, barSlots, setBarSlots, ...rest } = this.props;
        const { abilitysRequired } = this.state;
        const { editAbilityBarObj, isFetching, error } = equipmentReducer;

        const initialValues = this.getInitialValues();

        return (
            <Modal
                {...rest}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="EditAbilityBar"
                centered
            >
                <Modal.Header>
                    <Modal.Title>Add Ability Bar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.updateAllModal()}
                    <div className="ability-error">
                        <p>{error}</p>
                        <p>{abilitysRequired ? "Ability bar is empty! Load a style to begin." : ''}</p>
                    </div>
                    {isFetching ? <Spinner animation="border" variant="dark" /> :
                        editAbilityBarObj ?
                            <Formik
                                validationSchema={abilitySchema}
                                onSubmit={this.submitAbilityBar}
                                initialValues={initialValues}
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
                                            <Form.Group controlId="formSelect">
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Set Main Style:</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        as="select"
                                                        name="styleType"
                                                        aria-label="styleType"
                                                        aria-describedby="styleType"
                                                        value={values.styleType}
                                                        onChange={handleChange}
                                                        isInvalid={touched.styleType && !!errors.styleType}
                                                    >
                                                        <option value={''}>No style selected</option>
                                                        <option value={1}>Melee</option>
                                                        <option value={2}>Range</option>
                                                        <option value={3}>Magic</option>
                                                    </Form.Control>
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.styleType}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Form.Group>
                                            {this.showAbilityBar()}
                                            {this.showSubmit()}
                                        </Form>
                                    )}
                            </Formik>
                            :
                            <div>
                                {this.showAbilityBar()}
                                {this.showSubmit()}
                            </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

EditAbilityBar.propTypes = {
    equipmentReducer: PropTypes.object.isRequired,
    editAbilityBar: PropTypes.func.isRequired,
    clearAbilityBarObj: PropTypes.func,
    editFromPreset: PropTypes.bool,
    barSlots: PropTypes.array
};

export default EditAbilityBar;
