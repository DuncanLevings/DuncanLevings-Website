/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './ImgPreview.scss';

class ImgPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        const { removeImg, croppedImageUrl, ...rest } = this.props;

        return (
            <Modal
                {...rest}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="ImgPreview"
                centered
            >
                <Modal.Header>
                    <Modal.Title>Image Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {croppedImageUrl && (
                        <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.removeImg} variant="button-warning"><FaTrash /> Delete</Button>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

ImgPreview.propTypes = {};

ImgPreview.defaultProps = {};

export default ImgPreview;
