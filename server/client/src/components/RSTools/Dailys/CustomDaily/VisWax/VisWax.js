/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { Image, Spinner, Table } from 'react-bootstrap';
import './VisWax.scss';

class VisWax extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        const { isFetchingVis, visWaxRunes } = this.props.activityReducer;

        return (
            <div className="VisWax">
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
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        activityReducer: state.activityReducer
    };
}

export default connect(mapStateToProps, null)(VisWax);