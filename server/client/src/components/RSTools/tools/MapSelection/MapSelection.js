/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Button, Form, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { FaDesktop } from 'react-icons/fa';
import { mapSchema } from 'components/helpers/formValidation';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import './MapSelection.scss';

class MapSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    submitMap = values => {
        this.props.setMapURL(values.mapURL);
    }

    regexCheck = (url) => {
        if (/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/.test(url)) return true;
    }

    render() {
        const { mapURL, setMapURL, ...rest } = this.props;

        return (
            <Modal
                {...rest}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="MapSelection"
                centered
            >
                <Modal.Header>
                    <Modal.Title>Map Selection</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><b>Instructions:</b></p>
                    <p>Begin by opening map url, using map navigate to desired location.</p>
                    <p>Ensure to center desired location in center of window, copy url of window and paste into field below.</p>
                    <p>For alternative layers of the world, use this page to find desired area: <a href="https://runescape.wiki/w/User:Mejrs/map_zones" target="_blank" rel="noopener noreferrer">Zones</a>.</p>
                    <p>Copy mapId of zone. In url of map window, replace <i>mejrs.github.io/rs3?m=<b>#</b>...</i> section of url with mapId.</p>
                    <Formik
                        validationSchema={mapSchema}
                        onSubmit={this.submitMap}
                        initialValues={{
                            mapURL: mapURL !== '' ? mapURL : ''
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
                                                <InputGroup.Text>Map URL:</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                name="mapURL"
                                                placeholder="Paste map URL here"
                                                aria-label="mapURL"
                                                aria-describedby="mapURL"
                                                value={values.mapURL}
                                                onChange={handleChange}
                                                isInvalid={touched.mapURL && !!errors.mapURL}
                                                autoFocus
                                            />
                                            <InputGroup.Append>
                                                <Button 
                                                variant="button-primary" 
                                                href={values.mapURL !== '' && this.regexCheck(values.mapURL) ? values.mapURL : "https://mejrs.github.io/rs3"} 
                                                target="_"><FaDesktop /> Open Map URL</Button>
                                            </InputGroup.Append>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.mapURL}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>

                                    <div className="map-button">
                                        <Button
                                            variant="button-primary"
                                            type="submit">Submit</Button>
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

MapSelection.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    setMapURL: PropTypes.func.isRequired,
    mapURL: PropTypes.string.isRequired
};

export default MapSelection;
