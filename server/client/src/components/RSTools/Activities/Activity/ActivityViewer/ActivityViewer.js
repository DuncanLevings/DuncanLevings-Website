/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getActivitySingle } from 'store/actions/RSTools/activityActions';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import PresetOverview from 'components/RSTools/Equipment/PresetComponents/PresetOverview/PresetOverview.lazy';
import PropTypes from 'prop-types';
import './ActivityViewer.scss';
import { FaDesktop, FaYoutube } from 'react-icons/fa';

class ActivityViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getActivitySingle(this.props.match.params.activityId)
    }

    render() {
        const { activitySingle, isFetchingSingle } = this.props.activityReducer;

        if (isFetchingSingle) {
            return (
                <div className="ActivityViewer">
                    <Spinner animation="border" variant="light" />
                </div>
            );
        }

        if (!activitySingle && !isFetchingSingle) {
            return (
                <div className="ActivityViewer">
                    <div className="error">Failed to fetch activity!</div>
                </div>
            );
        }

        return (
            <Container>
                <div className="ActivityViewer">
                    <h3>{activitySingle.title}</h3>
                    <div className="spacer-h-2" />
                    <div className="preset-overview">
                        <PresetOverview
                            equipSlotData={activitySingle.preset.equipSlotData}
                            inventorySlotData={activitySingle.preset.inventorySlotData}
                            familiar={activitySingle.preset.familiar}
                            familiarSlotData={activitySingle.preset.familiarSlotData}
                            abilityBarData={activitySingle.preset.abilityBarData}
                            prayerData={activitySingle.preset.prayerData}
                        />
                    </div>
                    <div className="spacer-h-2" />
                    <Row>
                        <Col className="web"><Button variant="button-primary" disabled={!activitySingle.webURL} href={activitySingle.webURL} target="_blank" rel="noopener noreferrer"><FaDesktop /> Web Guide</Button></Col>
                        <Col className="youtube"><Button variant="button-warning" disabled={!activitySingle.youtubeURL} href={activitySingle.youtubeURL} target="_blank" rel="noopener noreferrer"><FaYoutube /> Youtube Guide</Button></Col>
                    </Row>
                    <div className="spacer-h-2" />
                    <Row>
                        <Col className="notes">{activitySingle.notes}</Col>
                    </Row>
                </div>
            </Container>
        );
    }
}

ActivityViewer.propTypes = {
    activityReducer: PropTypes.object,
    getActivitySingle: PropTypes.func
};

const mapStateToProps = state => {
    return {
        activityReducer: state.activityReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getActivitySingle }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ActivityViewer);
