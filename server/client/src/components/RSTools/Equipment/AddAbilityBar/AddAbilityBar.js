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
import './AddAbilityBar.scss';

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

class AddAbilityBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            }
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        if (this.props.equipmentReducer.searchAbilityBars !== prevProps.equipmentReducer.searchAbilityBars) {
            this.props.onHide();
        }
    }

    uniqueAbilityList = (key, type) => {
        const { abilityData, abilityBar } = this.state;
        let data = abilityData[key][type];
        return data.filter(val => !abilityBar.includes(val));
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

    submitAbilityBar = values => {
        if (this.state.abilityBar.length < 1) return this.setState({ abilitysRequired: true });
        else this.setState({ abilitysRequired: false });

        let formData = new FormData();

        formData.append('name', values.name);
        formData.append('styleType', values.styleType);
        formData.append('abilitys', JSON.stringify(this.state.abilityBar));

        this.props.createAbilityBar(formData);
    }

    render() {
        const { createAbilityBar, equipmentReducer, ...rest } = this.props;
        const { style, abilitysRequired, lengthError, duplicateError } = this.state;
        const { isCreating, error } = equipmentReducer;

        let droppable, droppable1, droppable2, droppable3 = null;
        if (style) {
            droppable = this.createList("abilityBar", "droppable");
            droppable1 = this.createList("basics", "droppable1");
            droppable2 = this.createList("thresholds", "droppable2");
            droppable3 = this.createList("ultimates", "droppable3");
        }

        return (
            <Modal
                {...rest}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="AddAbilityBar"
                centered
            >
                <Modal.Header>
                    <Modal.Title>Add Ability Bar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="ability-error">
                        <p>{error}</p>
                        <p>{abilitysRequired ? "Ability bar is empty! Load a style to begin." : ''}</p>
                    </div>
                    <Formik
                        validationSchema={abilitySchema}
                        onSubmit={this.submitAbilityBar}
                        initialValues={{
                            name: '',
                            styleType: ''
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
                                    <DropdownButton id="dropdown-style" title="Load Style" variant="button-secondary" onSelect={this.handleStyleSelect}>
                                        <Dropdown.Item eventKey="melee"><span><Image className="style-img" src="/static_images/RSTools/styles/melee.png" /> Melee</span></Dropdown.Item>
                                        <Dropdown.Item eventKey="range"><span><Image className="style-img" src="/static_images/RSTools/styles/range.png" /> Range</span></Dropdown.Item>
                                        <Dropdown.Item eventKey="magic"><span><Image className="style-img" src="/static_images/RSTools/styles/magic.png" /> Magic</span></Dropdown.Item>
                                        <Dropdown.Item eventKey="other"><span><Image className="style-img" src="/static_images/RSTools/styles/defence_abilities.png" /> Other</span></Dropdown.Item>
                                    </DropdownButton>
                                    <div className="spacer-h-2" />
                                    {lengthError ?
                                        <div className="ability-error">
                                            Reached limit of a single ability bar!
                                        </div> : null}
                                    {duplicateError ?
                                        <div className="ability-error">
                                            Cannot have duplicate abilitys!
                                        </div> : null}
                                    {style ?
                                        <DragDropContext onDragEnd={this.onDragEnd}>
                                            {droppable}
                                            <br />
                                            <p>Drag from below abilitys to your ability bar</p>
                                            {droppable1}
                                            <br />
                                            {droppable2}
                                            <br />
                                            {droppable3}
                                        </DragDropContext>
                                        : null}
                                    <div className="ability-button">
                                        <Button
                                            variant="button-primary"
                                            type="submit"
                                            disabled={isCreating}>Submit {isCreating ? <Spinner animation="border" variant="light" size="sm" /> : null}</Button>
                                    </div>
                                </Form>
                            )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

AddAbilityBar.propTypes = {
    equipmentReducer: PropTypes.object.isRequired,
    createAbilityBar: PropTypes.func.isRequired
};

export default AddAbilityBar;
