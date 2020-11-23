/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPvmTaskSingle } from 'store/actions/RSTools/pvmActions';
import { Accordion, Button, Card, Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import { FaDesktop, FaYoutube, FaMap, FaWikipediaW } from 'react-icons/fa';
import PresetOverview from 'components/RSTools/Equipment/PresetComponents/PresetOverview/PresetOverview.lazy';
import IFrameModal from 'components/tools/IFrameModal/IFrameModal.lazy';
import PropTypes from 'prop-types';
import './PvmTaskViewer.scss';

class PvmTaskViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMap: false,
            mapURL: ''
        }
    }

    componentDidMount() {
        this.props.getPvmTaskSingle(this.props.match.params.pvmTaskId);
    }

    setShowMap = (bool, mapURL = '') => {
        this.setState({
            showMap: bool,
            mapURL: mapURL
        });
    }

    render() {
        const { showMap, mapURL } = this.state;
        const { pvmTaskSingle, isFetching } = this.props.pvmReducer;

        if (isFetching) {
            return (
                <div className="PvmTaskViewer">
                    <Spinner animation="border" variant="light" />
                </div>
            );
        }

        if (!pvmTaskSingle && !isFetching) {
            return (
                <div className="PvmTaskViewer">
                    <div className="error">Failed to fetch task!</div>
                </div>
            );
        }

        return (
            <Container>
                <div className="PvmTaskViewer">
                    <h3>{pvmTaskSingle.taskName}</h3>
                    <div className="spacer-h-2" />
                    <Accordion>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey={0}>
                                {pvmTaskSingle.pvmName}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={0}>
                                <Card.Body>
                                    <Row>
                                        <Col className="web"><Button variant="button-primary" disabled={!pvmTaskSingle.wikiURL} href={pvmTaskSingle.wikiURL} target="_blank" rel="noopener noreferrer"><FaWikipediaW /> Wiki</Button></Col>
                                        <Col className="youtube"><Button variant="button-primary" disabled={!pvmTaskSingle.mapURL} onClick={() => this.setShowMap(true, pvmTaskSingle.mapURL)}><FaMap /> Map</Button></Col>
                                    </Row>
                                    <div className="spacer-h-2" />
                                    <Row>
                                        <Col className="task-img-col"><Image className="img" src={pvmTaskSingle.imageUrl} /></Col>
                                    </Row>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    <div className="spacer-h-2" />
                    <div className="preset-overview">
                        <PresetOverview
                            equipSlotData={pvmTaskSingle.preset.equipSlotData}
                            inventorySlotData={pvmTaskSingle.preset.inventorySlotData}
                            familiar={pvmTaskSingle.preset.familiar}
                            familiarSlotData={pvmTaskSingle.preset.familiarSlotData}
                            abilityBarData={pvmTaskSingle.preset.abilityBarData}
                            prayerData={pvmTaskSingle.preset.prayerData}
                        />
                    </div>
                    <div className="spacer-h-2" />
                    <Row>
                        <Col className="web"><Button variant="button-primary" disabled={!pvmTaskSingle.webURL} href={pvmTaskSingle.webURL} target="_blank" rel="noopener noreferrer"><FaDesktop /> Web Guide</Button></Col>
                        <Col className="youtube"><Button variant="button-warning" disabled={!pvmTaskSingle.youtubeURL} href={pvmTaskSingle.youtubeURL} target="_blank" rel="noopener noreferrer"><FaYoutube /> Youtube Guide</Button></Col>
                    </Row>
                    <div className="spacer-h-2" />
                    <Row>
                        <Col className="notes">{pvmTaskSingle.notes}</Col>
                    </Row>
                    <IFrameModal
                        show={showMap}
                        pageSrc={mapURL}
                        onHide={() => this.setState({ showMap: false })}
                    />
                </div>
            </Container>
        );
    }
}

PvmTaskViewer.propTypes = {
    pvmReducer: PropTypes.object,
    getPvmTaskSingle: PropTypes.func
};

const mapStateToProps = state => {
    return {
        pvmReducer: state.pvmReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getPvmTaskSingle }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PvmTaskViewer);