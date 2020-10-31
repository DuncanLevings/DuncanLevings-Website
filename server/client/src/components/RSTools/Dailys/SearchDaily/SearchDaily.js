/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Accordion, Button, Card, Container, Form, FormControl, InputGroup, Spinner } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { searchDaily, addDaily } from 'store/actions/dailyActions';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import PropTypes from 'prop-types';
import './SearchDaily.scss';

class SearchDaily extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            filterType: 0
        }
    }

    componentDidMount() {
        this.props.searchDaily(this.props.dailyReducer.dailyType, this.state.filterType);
    }

    navigate = (route) => {
        this.props.history.push(route);
    }

    setSearch = e => {
        this.setState({ search: e.target.value });
    }

    setFilter = e => {
        this.setState({ filterType: e.target.value });
        this.props.searchDaily(this.props.dailyReducer.dailyType, e.target.value);
    }

    addDaily = (id, type) => e => {
        e.stopPropagation();
        this.props.addDaily(id, type, this.state.filterType);
    }

    render() {
        const { dailyTypeName, searchDailys, isSearching, isAdding } = this.props.dailyReducer;
        const { search } = this.state;

        const searchResults = searchDailys
            .filter(d => search === '' || d.title.includes(search))
            .map((d, i) =>
                <Card key={i}>
                    <Accordion.Toggle as={Card.Header} eventKey={i}>
                        {d.title}
                        <span className="actions">
                            <Button 
                            variant="button-primary" 
                            className="add-daily" 
                            onClick={this.addDaily(d._id, d.type)}
                            disabled={isAdding}
                            ><FaPlus /> Add {dailyTypeName} {isAdding ? <Spinner animation="border" variant="light" size="sm" /> : null}</Button>
                        </span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={i}>
                        <Card.Body>
                            {d.steps.map((step, j) => {
                                return (
                                    <div className="step-container" key={j}>
                                        <Card.Text>
                                            {j + 1}. {step.step}
                                        </Card.Text>
                                        {step.url ?
                                            <Card.Img src={step.url} />
                                            : null}
                                    </div>
                                );
                            })}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            );

        return (
            <Container>
                <div className="SearchDaily">
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
                                    <Button variant="button-primary" onClick={() => this.navigate(RSTOOL_ROUTES.ADDDAILY)}>Add Custom {dailyTypeName}</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="formOptions">
                            <Form.Check
                                type="radio"
                                label="All activities"
                                name="formSearchOptions"
                                id="allResults"
                                value={0}
                                onChange={this.setFilter}
                                defaultChecked
                            />
                            <Form.Check
                                type="radio"
                                label="Public activities"
                                name="formSearchOptions"
                                id="publicOnly"
                                value={1}
                                onChange={this.setFilter}
                            />
                            <Form.Check
                                type="radio"
                                label="Your custom activites"
                                name="formSearchOptions"
                                id="customOnly"
                                value={2}
                                onChange={this.setFilter}
                            />
                        </Form.Group>
                    </Form>
                    {isSearching ? <Spinner animation="border" variant="light" /> :
                        <Accordion>
                            {searchResults.length > 0 ?
                                searchResults
                                :
                                <p>No results...</p>
                            }
                        </Accordion>
                    }
                </div>
            </Container>
        );
    }
}

SearchDaily.propTypes = {
    dailyReducer: PropTypes.object,
    searchDaily: PropTypes.func,
    addDaily: PropTypes.func
};

const mapStateToProps = state => {
    return {
        dailyReducer: state.dailyReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ searchDaily, addDaily }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchDaily));
