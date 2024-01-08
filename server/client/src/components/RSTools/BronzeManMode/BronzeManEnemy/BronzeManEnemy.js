/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */


import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEnemies, createEnemy, deleteEnemy, clearErrors } from 'store/actions/RSTools/bronzeManActions';
import { Button, Col, Container, Form, FormControl, InputGroup, ListGroup, Modal, Row, Spinner } from 'react-bootstrap';
import { FaEye, FaTrash } from 'react-icons/fa';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import AddBronzeManEnemy from '../AddBronzeManEnemy/AddBronzeManEnemy.lazy';
import _ from "lodash";
import './BronzeManEnemy.scss';

class BronzeManEnemy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            addEnemyShow: false,
            showConfirm: false
        }
    }

    componentDidMount() {
    }

    navigate = (route, state = null) => {
        this.props.history.push({
            pathname: route,
            state: state
        });
    }

    setSearch = _.debounce((e) => {
        this.setState({ search: e });
        this.props.getEnemies(e);
    }, 500)

    setAddEnemyShow = (bool) => {
        this.setState({ addEnemyShow: bool });
    }

    setShowConfirm = (bool, enemyId = null) => {
        this.setState({
            showConfirm: bool,
            selectedEnemyId: enemyId ? enemyId : this.state.selectedEnemyId
        });
    }

    deleteEnemy = () => {
        this.props.deleteEnemy(this.state.selectedEnemyId);
        this.props.getEnemies("");
        this.setState({ showConfirm: false });
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
                    <p>Are you sure you wish to delete this enemy?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="button-secondary" onClick={() => this.setShowConfirm(false)}>Cancel</Button>
                    <Button variant="button-warning" onClick={() => this.deleteEnemy()}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    generateSearchResults = () => {
        const { search } = this.state;
        const { enemies } = this.props.bronzeManReducer;

        if (search === '') return [];
        if (!Array.isArray(enemies)) return [];

        return enemies
            .map((enemy, i) =>
                <ListGroup.Item key={i}>
                    <Row>
                        <Col xs={1}>
                            <span className="actions">
                                <FaEye className="action-icon view" size="1.5em" onClick={() => this.navigate(RSTOOL_ROUTES.BRONZE_MAN_ENEMY,
                                        {
                                            from: this.props.location.pathname,
                                            enemyName: enemy.name
                                        })} />
                            </span>
                        </Col>
                        <Col>{enemy.name}</Col>
                        <Col>
                            <span className="actions">
                                <FaTrash className="action-icon delete" onClick={() => this.setShowConfirm(true, enemy._id)} />
                            </span>
                        </Col>
                    </Row>
                </ListGroup.Item>
            );
    }

    render() {
        const { addEnemyShow } = this.state;
        const { isFetching } = this.props.bronzeManReducer;

        const searchResults = this.generateSearchResults();

        return (
            <Container>
                <div className="BronzeManEnemy">
                    {this.confirmModal()}
                    <Form>
                        <Form.Group controlId="formSearch">
                            <InputGroup>
                                <FormControl
                                    placeholder="Search..."
                                    aria-label="search"
                                    aria-describedby="search"
                                    onChange={(e) => this.setSearch(e.target.value)}
                                />
                                <InputGroup.Append>
                                    <Button variant="button-primary" onClick={() => this.setAddEnemyShow(true)}>Add Enemy</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                    <div className="spacer-h-3" />
                    {isFetching ?
                        <Spinner animation="border" variant="light" /> :
                        searchResults.length > 0 ?
                            <ListGroup variant="flush" className="scrollable-list">
                                {searchResults}
                            </ListGroup> :
                            <p>No enemies found...</p>
                    }
                    <AddBronzeManEnemy
                        show={addEnemyShow}
                        bronzeManReducer={this.props.bronzeManReducer}
                        createEnemy={data => this.props.createEnemy(data)}
                        clearErrors={() => this.props.clearErrors()}
                        onHide={() => this.setAddEnemyShow(false)}
                    />
                </div>
            </Container>
        );
    }
}

BronzeManEnemy.propTypes = {
    bronzeManReducer: PropTypes.object
};

const mapStateToProps = state => {
    return {
        bronzeManReducer: state.bronzeManReducer,
        getEnemies: PropTypes.func,
        createEnemy: PropTypes.func,
        deleteEnemy: PropTypes.func,
        clearErrors: PropTypes.func
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getEnemies, createEnemy, deleteEnemy, clearErrors }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BronzeManEnemy));
