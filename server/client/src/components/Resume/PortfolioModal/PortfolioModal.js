/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Carousel, Row, Col } from 'react-bootstrap';
import { FaTools } from 'react-icons/fa';
import './PortfolioModal.scss';

class PortfolioModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    openLink = (link) => {
        this.props.history.push(link);
    }

    render() {
        if (!this.props.selectedproject) return null;

        const { staticContext, ...rest } = this.props;
        const { title, images = ["/static_images/placeholder_project.png"], languages = [], tools = [], details = [], link, github, completed } = this.props.selectedproject;

        return (
            <Modal
                {...rest}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="PortfolioModal text"
                centered
            >
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {images ? (
                        <Carousel>
                            {images.map((img, i) => {
                                return (
                                    <Carousel.Item key={i}>
                                        <img
                                            className="d-block w-100"
                                            src={img}
                                            alt="project"
                                        />
                                    </Carousel.Item>
                                );
                            })}
                        </Carousel>
                    ) :
                    (null)}
                    <div className="spacer-h-2" />
                    <Row>
                        <Col>
                            <div className="portfolio-header">Languages used:</div>
                            {languages.map((language, i) => {
                                return (
                                    <Row key={i}>
                                        <Col>
                                            {language.icon ? (
                                                <i className={`language-icon devicon-${language.icon}-plain`} />
                                            ) : (<FaTools />)} 
                                            <span className="language-text">{language.text}</span>
                                        </Col>
                                    </Row>
                                );
                            })}
                        </Col>
                        <Col>
                            <div className="portfolio-header">Tools used:</div>
                            {tools.map((tool, i) => {
                                return (
                                    <Row key={i}>
                                        <Col>
                                            {tool.icon ? (
                                                <i className={`language-icon devicon-${tool.icon}-plain`} />
                                            ) : (<FaTools />)}
                                            <span className="language-text">{tool.text}</span>
                                        </Col>
                                    </Row>
                                );
                            })}
                        </Col>
                    </Row>
                    <hr />
                    <div className="portfolio-header">{completed ? "Features:" : "Features Planned - Work in Progress:"}</div>
                    <ul className="portfolio-details">
                        {details.map((item, i) => {
                            return (
                                <li key={i}>{item}</li>
                            );
                        })}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <div className="portfolio-link">
                        {link ? (
                            <Button className="portfolio-footer-button" variant="button-primary" href={link} target="_blank">View site</Button>
                        ) : (null)}
                        {github ? (
                            <Button className="portfolio-footer-button" variant="button-primary" href={github} target="_blank">Github</Button>
                        ) : (null)}
                    </div>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default withRouter(PortfolioModal);
