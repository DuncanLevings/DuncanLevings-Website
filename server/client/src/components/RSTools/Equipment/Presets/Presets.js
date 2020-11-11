/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Form, FormControl, InputGroup } from 'react-bootstrap';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import PropTypes from 'prop-types';
import './Presets.scss';

class Presets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    navigate = (route) => {
        this.props.history.push(route);
    }

    render() {
        return (
            <Container>
                <div className="Presets">
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
                </div>
            </Container>

        );
    }
}

Presets.propTypes = {};

Presets.defaultProps = {};

export default withRouter(Presets);
