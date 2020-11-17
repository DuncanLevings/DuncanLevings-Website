/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFarmRun } from 'store/actions/RSTools/farmRunActions';
import { clearPreset } from 'store/actions/RSTools/presetActions';
import PresetOverview from 'components/RSTools/Equipment/PresetComponents/PresetOverview/PresetOverview.lazy';
import { Accordion, Button, Card, Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import { FARM_CONSTS, RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import { FaDesktop, FaEdit, FaPlus, FaYoutube } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './FarmRun.scss';

class FarmRun extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            farmType: -1
        }
    }

    componentDidMount() {
        this.setState({ farmType: this.props.match.params.farmType });
        this.props.getFarmRun(this.props.match.params.farmType);

        if (this.props.presetReducer.savedPreset) this.props.clearPreset();
    }

    navigate = (route, edit) => {
        const { pathname } = this.props.location;

        this.props.history.push({
            pathname: route,
            state: {
                from: pathname,
                editMode: edit
            }
        });
    }

    generateFarmRunSteps = (steps, hidden = null) => {
        const { farmType } = this.state;

        return steps.map((step, i) => {
            var cardKey = i.toString();

            if (farmType == 0) {
                if (hidden.includes(step.type)) return null;
            }

            return (
                <Accordion key={i}>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey={cardKey}>
                            {step.type ? <Image className="step-icon" src={FARM_CONSTS.farmTypeIcons[step.type]} /> : null}
                            {step.title}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={cardKey}>
                            <Card.Body>
                                {step.step}
                                {step.url ?
                                    <div className="spacer-h-2">
                                        <Card.Img src={step.url} />
                                    </div>
                                    : null}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            );
        });
    }

    generateFarmRun = () => {
        const { farmRun } = this.props.farmRunReducer;

        if (farmRun) {
            const { preset, webURL, youtubeURL, notes, steps, hidden } = farmRun;

            return (
                <div>
                    <div className="preset-overview">
                        <PresetOverview
                            equipSlotData={preset.equipSlotData}
                            inventorySlotData={preset.inventorySlotData}
                            familiar={preset.familiar}
                            familiarSlotData={preset.familiarSlotData}
                            abilityBarData={preset.abilityBarData}
                            prayerData={preset.prayerData}
                        />
                    </div>
                    <div className="spacer-h-2" />
                    <Row>
                        <Col className="web"><Button variant="button-primary" disabled={!webURL} href={webURL} target="_"><FaDesktop /> Web Guide</Button></Col>
                        <Col className="youtube"><Button variant="button-warning" disabled={!youtubeURL} href={youtubeURL} target="_"><FaYoutube /> Youtube Guide</Button></Col>
                    </Row>
                    <div className="spacer-h-2" />
                    <Row>
                        <Col className="notes">{notes}</Col>
                    </Row>
                    <div className="spacer-h-2" />
                    {this.generateFarmRunSteps(steps, hidden)}
                </div>
            )
        }

        return null;
    }

    render() {
        const { farmType } = this.state;
        const { farmRun, isFetching } = this.props.farmRunReducer;

        if (isFetching) {
            return (
                <div className="FarmRun">
                    <Spinner animation="border" variant="light" />
                </div>
            );
        }

        return (
            <Container>
                <div className="FarmRun">
                    <div className="farm-header">
                        {farmRun ?
                            <Button variant="button-primary" className="edit" onClick={() => this.navigate(RSTOOL_ROUTES.FARMRUN_BUILDER_PARAM + farmType, true)}><FaEdit /> Edit</Button>
                            :
                            <Button variant="button-primary" className="edit" onClick={() => this.navigate(RSTOOL_ROUTES.FARMRUN_BUILDER_PARAM + farmType)}><FaPlus /> Create</Button>
                        }
                    </div>
                    <h3>{FARM_CONSTS.farmTypeNames[farmType]}</h3>
                    {this.generateFarmRun()}
                </div>
            </Container>
        );
    }
}

FarmRun.propTypes = {
    farmRunReducer: PropTypes.object,
    getFarmRun: PropTypes.func,
    presetReducer: PropTypes.object,
    clearPreset: PropTypes.func
};

const mapStateToProps = state => {
    return {
        farmRunReducer: state.farmRunReducer,
        presetReducer: state.presetReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getFarmRun, clearPreset }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FarmRun));