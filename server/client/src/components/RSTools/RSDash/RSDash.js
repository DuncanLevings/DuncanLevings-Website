/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** Spinner ***REMOVED*** from 'react-bootstrap';
import PropTypes from 'prop-types';
import './RSDash.css';

class RSDash extends React.Component ***REMOVED***
    constructor(props) ***REMOVED***
        super(props);
        this.state = ***REMOVED******REMOVED***
    ***REMOVED***

    componentDidMount() ***REMOVED***
    ***REMOVED***

    render() ***REMOVED***
        const ***REMOVED*** isFetching, user ***REMOVED*** = this.props.userReducer;
        return (
            <div className="RSDash">
                ***REMOVED***isFetching || !user ?
                    <Spinner variant="light"/>
                : <h1>Weclome ***REMOVED***user.username***REMOVED***</h1>***REMOVED***
            </div>
        );
    ***REMOVED***
***REMOVED***

RSDash.propTypes = ***REMOVED***
    userReducer: PropTypes.object
***REMOVED***;

const mapStateToProps = state => ***REMOVED***
    return ***REMOVED***
        userReducer: state.userReducer
    ***REMOVED***;
***REMOVED***

export default connect(mapStateToProps, null)(RSDash);