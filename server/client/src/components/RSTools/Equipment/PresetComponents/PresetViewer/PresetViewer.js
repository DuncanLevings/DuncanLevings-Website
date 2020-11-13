/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPresetSingle } from 'store/actions/RSTools/presetActions';
import { Container, Spinner } from 'react-bootstrap';
import PresetOverview from '../PresetOverview/PresetOverview.lazy';
import PropTypes from 'prop-types';
import './PresetViewer.scss';

class PresetViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getPresetSingle(this.props.match.params.presetId)
    }

    render() {
        const { editPresetObj, isFetchingSingle } = this.props.presetReducer;

        if (!editPresetObj || isFetchingSingle) {
            return (
                <Spinner animation="border" variant="light" />
            );
        }

        return (
            <Container>
                <div className="PresetViewer">
                    <h3>{editPresetObj.name}</h3>
                    <div className="spacer-h-2" />
                    <div className="preset-overview">
                        <PresetOverview
                            equipSlotData={editPresetObj.equipSlotData}
                            inventorySlotData={editPresetObj.inventorySlotData}
                            familiar={editPresetObj.familiar}
                            familiarSlotData={editPresetObj.familiarSlotData}
                        />
                    </div>
                </div>
            </Container>
        );
    }
}

PresetViewer.propTypes = {
    presetReducer: PropTypes.object,
    getPresetSingle: PropTypes.func
};

const mapStateToProps = state => {
    return {
        presetReducer: state.presetReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getPresetSingle }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PresetViewer);