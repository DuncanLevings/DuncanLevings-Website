/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Container, Image, Spinner, Table } from 'react-bootstrap';
import { getVixWax, getLastestNemi } from 'store/actions/activityActions';
import PropTypes from 'prop-types';
import './VisNemi.scss';

class VisNemi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getVixWax();
        this.props.getLastestNemi();
    }

    render() {
        const { isFetchingVis, isFetchingNemi, visWaxRunes, nemiForest } = this.props.activityReducer;

        return (
            <Container>
                <div className="VisNemi">
                    {isFetchingVis || !visWaxRunes ?
                        <span>Fetching Runes... <Spinner animation="border" variant="light" /></span> :
                        <Table striped variant="dark">
                            <thead>
                                <tr>
                                    <th className="table-header" colSpan="3">First Rune</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="3">{visWaxRunes.firstRune.name} <br /> <Image src={`/static_images/RSTools/runes/${visWaxRunes.firstRune.img}.gif`} /></td>
                                </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <th className="table-header" colSpan="3">Second Rune</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {visWaxRunes.secondRune.map((rune, i) => {
                                        return (
                                            <td key={i}>{rune.name} <br /> <Image src={`/static_images/RSTools/runes/${rune.img}.gif`} /></td>
                                        );
                                    })}
                                </tr>
                            </tbody>
                        </Table>
                    }
                    <div className="spacer-h-3" />
                    <Card>
                        {isFetchingNemi || !nemiForest ?
                            <span>Fetching Image... <Spinner animation="border" variant="light" /></span> :
                            <Card.Img variant="top" src={nemiForest.url} />
                        }
                    </Card>
                </div>
            </Container>
        );
    }
}

VisNemi.propTypes = {
    getVixWax: PropTypes.func,
    getLastestNemi: PropTypes.func
};

const mapStateToProps = state => {
    return {
        activityReducer: state.activityReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getVixWax, getLastestNemi }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VisNemi);