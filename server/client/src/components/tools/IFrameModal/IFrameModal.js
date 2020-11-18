/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Modal } from 'react-bootstrap';
import Iframe from 'react-iframe';
import PropTypes from 'prop-types';
import './IFrameModal.scss';

class IFrameModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        const { pageSrc, ...rest } = this.props;
        return (
            <Modal
                {...rest}
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="IFrameModal"
                centered
            >
                <Modal.Body>
                    <Iframe url={pageSrc}
                        width="450px"
                        height="450px"
                        id="iframeID"
                        className="iFrameCustom"
                        display="initial"
                        position="relative" />
                </Modal.Body>
            </Modal>
        );
    }
}

IFrameModal.propTypes = {
    pageSrc: PropTypes.string.isRequired
};

export default IFrameModal;
