/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col, Card, CardDeck } from 'react-bootstrap';
import { updateActiveHash } from 'store/actions/navbarActions';
import { RESUME_ROUTES } from 'consts/Resume_Consts';
import PortfolioModal from '../PortfolioModal/PortfolioModal.lazy';
import './Portfolio.scss';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: [
                {
                    icon: "react",
                    text: "REACT"
                },
                {
                    icon: "angularjs",
                    text: "ANGULAR"
                },
                {
                    icon: "javascript",
                    text: "JAVASCRIPT"
                },
                {
                    icon: "java",
                    text: "JAVA"
                },
                {
                    icon: "python",
                    text: "PYTHON"
                },
                {
                    icon: "android",
                    text: "ANDROID"
                },
                {
                    icon: "apple",
                    text: "IOS"
                },
                {
                    icon: "csharp",
                    text: "C#"
                },
                {
                    icon: "cplusplus",
                    text: "C++"
                },
                {
                    icon: "github",
                    text: "SCRIPTS"
                }
            ],
            projects: [
                {
                    title: "DuncanLevings website",
                    icon: "react",
                    context: "My personal resume website.",
                    dateStart: "May 2020",
                    dateEnd: "",
                    images: ["/static_images/project_img1.png", "/static_images/project_img2.png"],
                    languages: [
                        {
                            icon: "react",
                            text: "React"
                        },
                        {
                            icon: "typescript",
                            text: "Typescript"
                        },
                        {
                            icon: "nodejs",
                            text: "NodeJS"
                        },
                        {
                            icon: "bootstrap",
                            text: "Bootstrap"
                        }
                    ],
                    tools: [
                        {
                            icon: "github",
                            text: "Github"
                        },
                        {
                            icon: "visualstudio",
                            text: "Visual Studio"
                        },
                        {
                            icon: "google",
                            text: "Google Services"
                        },
                        {
                            icon: "mongodb",
                            text: "MongoDB"
                        },
                        {
                            icon: "redis",
                            text: "Redis"
                        }
                    ],
                    details: [
                        "Built upon React libary utilizing Google App Engine for deployment.",
                        "Responsive design allowing user friendly browsing on all devices.",
                        "Admin login for adding/editing/removing components of the site."
                    ],
                    link: "localhost:3000",
                    github: "https://github.com/DuncanLevings/personal_website",
                    completed: false,
                    date: "" // used for mongodb retrival
                },
                {
                    title: "RSTools",
                    icon: "react",
                    context: "Collection of tools to enhance game interaction.",
                    dates: "May 2020 - Current"
                },
                {
                    title: "Royaltymine",
                    icon: "react",
                    context: "Website owned by ZHYInteractive. MongoDB, SocketIO, JWT Tokens...",
                    dates: "Jan 2020 - June 2020"
                },
                {
                    title: "Find A Spot",
                    icon: "android",
                    context: "App for finding nearby parking.",
                    dates: "Jan 2019 – Apr 2019"
                },
                {
                    title: "Web Scraper",
                    icon: "python",
                    context: "Tool to scrape website with python",
                    dates: "2019 Jan - 2019 Jan"
                },
                {
                    title: "Slayer Tool",
                    icon: "csharp",
                    context: "Windows app to allow creating preset loadouts.",
                    dates: "2018 Dec - 2018 Dec"
                },
                {
                    title: "School Assignments",
                    icon: "java",
                    context: "Various assignments using Java.",
                    dates: "2018"
                },
                {
                    title: "School Assignments",
                    icon: "javascript",
                    context: "Various assignments using Javascript.",
                    dates: "2018"
                },
                {
                    title: "School Assignments",
                    icon: "cplusplus",
                    context: "Various assignments using C/C++.",
                    dates: "2018"
                },
                {
                    title: "School Assignments",
                    icon: "python",
                    context: "Various assignments using Python.",
                    dates: "2018"
                },
                {
                    title: "Recipe Plus",
                    icon: "android",
                    context: "App for creating recipes.",
                    dates: "Oct 2018 – Dec 2018"
                },
                {
                    title: "Inner Hero",
                    icon: "csharp",
                    context: "Capstone project, fully functional Unity game.",
                    dates: "Apr 2016 – Aug 2016"
                },
                {
                    title: "Darkest Dungeon",
                    icon: "csharp",
                    context: "Unity game with multiplayer",
                    dates: "Jan 2016 – Apr 2016"
                },
                {
                    title: "Borderlands 2 AHK Scripts",
                    icon: "github",
                    context: "AHK scripts",
                    dates: "TBD"
                },
                {
                    title: "Runescape AHK Scripts",
                    icon: "github",
                    context: "AHK scripts",
                    dates: "TBD"
                },
                {
                    title: "Darksouls AHK Scripts",
                    icon: "github",
                    context: "AHK scripts",
                    dates: "TBD"
                },
                {
                    title: "Disgaea AHK Scripts",
                    icon: "github",
                    context: "AHK scripts",
                    dates: "TBD"
                },
                {
                    title: "Warframe AHK Scripts",
                    icon: "github",
                    context: "AHK scripts",
                    dates: "TBD"
                },
                {
                    title: "Dungeon Defenders AHK Scripts",
                    icon: "github",
                    context: "AHK scripts",
                    dates: "TBD"
                },
                {
                    title: "Modded Minecraft AHK Scripts",
                    icon: "github",
                    context: "AHK scripts",
                    dates: "TBD"
                }
            ],
            showModal: false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.updateActiveHash(RESUME_ROUTES.HASH_PORTFOLIO);
    }

    showModal = (bool, index = -1) => {
        this.setState({ showModal: bool });
        if (index > -1) this.setState({ selectedProject: this.state.projects[index] });
    }

    render() {
        const { showModal, selectedProject } = this.state;
        return (
            <div className="Portfolio">
                <Container className="content">
                    <PortfolioModal
                        show={showModal}
                        onHide={() => this.showModal(false)}
                        selectedproject={selectedProject}
                    />
                    <Row className="justify-content-center">
                        {this.state.languages.map((language, i) => {
                            return (
                                <Col key={i} xs={3} lg={1} xl={"auto"}>
                                    <div className="language-container">
                                        <i className={`language-icon devicon-${language.icon}-plain`} />
                                        <div className="language-text">
                                            {language.text}
                                        </div>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                    <div className="d-none d-xl-block spacer-h-3" />
                    <hr className="portfolio-divider"/>
                    <div className="d-none d-xl-block spacer-h-3" />
                    <CardDeck>
                        {this.state.projects.map((project, i) => {
                                return (
                                    <Card className="portfolio-card" key={i} onClick={() => this.showModal(true, i) }>
                                        <Card.Body className="main-body">
                                            <Card.Title>{project.title}<i className={`portfolio-icon devicon-${project.icon}-plain`} /></Card.Title>
                                            <Card.Text>
                                                {project.context}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Body>
                                            <span className="click-to-read-more">Click to read more...</span>
                                        </Card.Body>
                                        <Card.Footer>
                                            <small className="text-muted">Dates: {project.dateStart} - {project.dateEnd ? project.dateEnd : "current"}</small>
                                        </Card.Footer>
                                    </Card>
                                );
                            })}
                    </CardDeck>
                </Container>
            </div>
        );
    }
}

Portfolio.propTypes = {
    updateActiveHash: PropTypes.func
};
const mapDispatchToProps = dispatch => bindActionCreators({ updateActiveHash }, dispatch);

export default connect(null, mapDispatchToProps)(Portfolio);