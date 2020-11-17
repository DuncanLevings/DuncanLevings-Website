/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import './Notification.scss';

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
        if (this.props.notificationReducer !== prevProps.notificationReducer) {
            console.log(this.props.notificationReducer)
            //show notification
            // this.fetchData(this.props.userID);
        }
    }

    showNotification = (toast, i) => {        
        //props will have list of notifications
        //display all as toast in list
        //each one will have a lifespan, removes itself from prop list when dead
        //can also be exited out

        const { notification_list } = this.props.notificationReducer;
        //update 
        const [list, setList] = useState(notification_list);
        const [show, setShow] = useState(false);

        useEffect(() => {
            setList(notification_list);
            setShow(true);
        }, [notification_list, list]);
        console.log("HERE")
        return (
            <Toast key={i} onClose={() => setShow(false)} show={show} delay={3000} style={{ backgroundColor: toast.backgroundColor }}>
                <Toast.Header style={{ backgroundColor: toast.headerColor, color: "black" }}>
                    <img
                        src={toast.icon}
                        className="rounded mr-2"
                        alt="icon"
                    />
                    <strong className="mr-auto">{toast.title}</strong>
                </Toast.Header>
                <Toast.Body>{toast.description}</Toast.Body>
            </Toast>
        );
    }

    render() {
        //loop list to display toasts
        return (
            <div className="Notification">
                {/* list.map((toast, i) =>
                    {this.showNotification(toast, i)}
                ) */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        notificationReducer: state.notificationReducer
    };
}

export default connect(mapStateToProps, null)(Notification);
