/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** bindActionCreators ***REMOVED*** from 'redux';
import ***REMOVED*** getUser ***REMOVED*** from 'actions/userActions';
import PropTypes from 'prop-types';
import styles from './RSDash.css';
import ***REMOVED*** Spinner ***REMOVED*** from 'react-bootstrap';

class RSDash extends React.Component ***REMOVED***
    constructor(props) ***REMOVED***
        super(props);
        this.state = ***REMOVED******REMOVED***
    ***REMOVED***

    componentDidMount() ***REMOVED***
        this.props.getUser();
    ***REMOVED***

    render() ***REMOVED***
        const ***REMOVED*** isFetching, user ***REMOVED*** = this.props.userReducer;
        return (
            <div className="RSDash">
                <h1>RSDash component</h1>
                ***REMOVED***isFetching || !user ?
                    <Spinner />
                : <h6>Weclome ***REMOVED***user.username***REMOVED***</h6>***REMOVED***
            </div>
        );
    ***REMOVED***
***REMOVED***

RSDash.propTypes = ***REMOVED***
    getUser: PropTypes.func,
    userReducer: PropTypes.object
***REMOVED***;

const mapStateToProps = state => ***REMOVED***
    return ***REMOVED***
        userReducer: state.userReducer
    ***REMOVED***;
***REMOVED***

const mapDispatchToProps = dispatch => bindActionCreators(***REMOVED*** getUser ***REMOVED***, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RSDash);