/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React, { useCallback } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';
import PropTypes from 'prop-types';
import './ImgCrop.scss';

function DropZone(props) {
    const onDrop = useCallback(acceptedFiles => {
        props.onFileChange(acceptedFiles);
    }, [])
    const {
        getRootProps,
        getInputProps,
        acceptedFiles,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: 'image/jpeg, image/png'
    });

    const acceptedFileItems = acceptedFiles.map(file => (
        file.path
      ));

    return (
        <section className="container">
            <div {...getRootProps({ className: `dropzone ${(!isDragActive && 'unactive') || (isDragAccept && 'accept') || (isDragReject && 'reject')}` })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop image here, or click to select image</p>
                <span>{acceptedFileItems}</span>
            </div>
        </section>
    );
}

class ImgCrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: null,
            crop: {
                unit: '%',
                height: 100,
                width: 100
            },
        };
    }

    componentDidMount() {
    }

    onSelectFile = files => {
        if (files && files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({ src: reader.result })
            );
            reader.readAsDataURL(files[0]);
        }
    };

    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        this.setState({ crop: percentCrop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                // window.URL.revokeObjectURL(this.fileUrl);  --HANDLE REVOKING OF URLS IN FORM SUBMIT
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }

    confirm = () => {
        this.props.onConfirm(this.state.croppedImageUrl);
        this.setState({ src: null, croppedImageUrl: null });
    }

    hide = () => {
        this.setState({ src: null, croppedImageUrl: null });
        this.props.onHide();
    }

    render() {
        const { onConfirm, ...rest } = this.props;
        const { crop, croppedImageUrl, src } = this.state;

        return (
            <Modal
                {...rest}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="ImgCrop"
                centered
            >
                <Modal.Header>
                    <Modal.Title>Image Crop</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DropZone onFileChange={this.onSelectFile} />
                    <div className="spacer-h-2" />
                    {src && (
                        <ReactCrop
                            src={src}
                            crop={crop}
                            ruleOfThirds
                            onImageLoaded={this.onImageLoaded}
                            onComplete={this.onCropComplete}
                            onChange={this.onCropChange}
                        />
                    )}
                    <div className="spacer-h-2" />
                    <h3>Preview:</h3>
                    {croppedImageUrl && (
                        <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} onError={() => this.setState({croppedImageUrl: ''})} />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.confirm} variant="button-primary">Confirm</Button>
                    <Button onClick={this.hide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

ImgCrop.propTypes = {};

ImgCrop.defaultProps = {};

export default ImgCrop;
