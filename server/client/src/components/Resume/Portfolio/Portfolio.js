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
                    text: "REACT",
                    mainIcon: true
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
                    title: "Duncan Levings",
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
                        "Built upon React library utilizing Google App Engine for deployment.",
                        "Designed framework and security for website, utilized Passport and JWT Tokens.",
                        "Responsive design allowing user friendly browsing on all devices.",
                        "Admin login for adding/editing/removing components of the site.",
                        "Utilizing React reducers using Saga worker framework to send and retrieve data from backend services.",
                    ],
                    link: "https://duncanlevings.com",
                    github: "https://github.com/DuncanLevings/personal_website",
                    completed: false,
                    date: "" // used for mongodb retrival
                },
                {
                    title: "RSTools",
                    icon: "react",
                    context: "Collection of tools to enhance game interaction.",
                    dateStart: "May 2020",
                    dateEnd: "",
                    images: ["/static_images/rstool_1.png", "/static_images/rstool_2.png", "/static_images/rstool_3.png", "/static_images/rstool_4.png", "/static_images/rstool_5.png", "/static_images/rstool_6.png"],
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
                        }
                    ],
                    details: [
                        "Branch of personal website that contains RSTools, a set of tools created for the game; RuneScape.",
                        "Designed tool to allow multiple users by linking created objects with logged in user.",
                        "Allows users to create daily tasks, preset (shopping cart) equipment loadouts and step by step guides.",
                        "Utilizing mongoDB for data storage allowing for basic CRUD operations.",
                        "Image hosting with Google buckets, and web scrapping for various useful websites to consolidate data."
                    ],
                    link: "https://duncanlevings.com/rs-tools",
                    github: "https://github.com/DuncanLevings/personal_website/tree/master/server/client/src/components/RSTools",
                    completed: false,
                    date: "" // used for mongodb retrival
                },
                {
                    title: "Royaltymine",
                    icon: "react",
                    context: "Website owned by ZHYInteractive.",
                    dateStart: "Jan 2020",
                    dateEnd: "June 2020",
                    images: ["/static_images/royaltymine1.png", "/static_images/royaltymine2.png", "/static_images/royaltymine3.png"],
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
                            icon: "",
                            text: "AntD Styling"
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
                        },
                        {
                            icon: "",
                            text: "SendGrid"
                        }
                    ],
                    details: [
                        "Utilized MongoDB along with conventional standards in react services to develop new backend features.",
                        "Integrated Aggregate functionality into the backend to significantly improve performance.",
                        "Created new front-end pages using Ant design along with Bootstrap",
                        "Implemented JWT Token authentication for login and user access permissions.",
                        "Uses Socket.IO created connection streams for real-time notifications."
                    ],
                    link: "https://royaltymine.com/",
                    github: "",
                    completed: true,
                    date: "" // used for mongodb retrival
                },
                {
                    title: "Find A Spot",
                    icon: "android",
                    context: "App for finding nearby parking.",
                    dateStart: "Jan 2019",
                    dateEnd: "Apr 2019",
                    languages: [
                        {
                            icon: "android",
                            text: "Android"
                        },
                        {
                            icon: "",
                            text: "Cordova"
                        },
                        {
                            icon: "javascript",
                            text: "Javascript"
                        },
                        {
                            icon: "html5",
                            text: "Html"
                        },
                        {
                            icon: "css3",
                            text: "Css"
                        }
                    ],
                    tools: [
                        {
                            icon: "github",
                            text: "Github"
                        },
                        {
                            icon: "",
                            text: "IntelliJ IDEA"
                        },
                        {
                            icon: "",
                            text: "Firebase"
                        }
                    ],
                    details: [
                        "Utilizing Geolocation and parking data API, finds all parking locations with user preferences in mind.",
                        "User preferences stored in firebase and used to filter parking data."
                    ],
                    github: "https://github.com/DuncanLevings/PersonalWork/tree/master/Web%20Development/School/FindASpot",
                    completed: true,
                    date: "" // used for mongodb retrival
                },
                {
                    title: "Web Scraper",
                    icon: "python",
                    context: "Tool to scrape website with python",
                    dateStart: "2019 Jan",
                    dateEnd: "2019 Jan",
                    languages: [
                        {
                            icon: "python",
                            text: "Python"
                        }
                    ],
                    tools: [
                        {
                            icon: "",
                            text: "Python3"
                        }
                    ],
                    details: [
                        "Scapes data from a website, parses it and sends the data to a google sheet.",
                    ],
                    github: "https://github.com/DuncanLevings/PersonalWork/tree/master/Python/Personal/WebScraper",
                    completed: true,
                    date: "" // used for mongodb retrival
                },
                {
                    title: "Slayer Tool",
                    icon: "csharp",
                    context: "Windows application to allow creating preset loadouts.",
                    dateStart: "2018 Dec",
                    dateEnd: "2018 Dec",
                    languages: [
                        {
                            icon: "csharp",
                            text: "C#"
                        }
                    ],
                    tools: [
                        {
                            icon: "visualstudio",
                            text: "Visual Studio"
                        }
                    ],
                    details: [
                        "Allows creation of preset (shopping cart) loadouts for optimal setups of various in game tasks in RuneScape.",
                        "Data stored in xml format with images retrieved from local files.",
                        "Utilizes Gson Ids to keep track of unique xml objects."
                    ],
                    github: "https://github.com/DuncanLevings/PersonalWork/tree/master/CS/Personal/SlayerTool",
                    completed: true,
                    date: "" // used for mongodb retrival
                },
                {
                    title: "School Assignments",
                    icon: "java",
                    context: "Various assignments using Java.",
                    dateStart: "2018",
                    dateEnd: "2018",
                    languages: [
                        {
                            icon: "java",
                            text: "Java"
                        }
                    ],
                    tools: [
                        {
                            icon: "",
                            text: "Android Studio"
                        }
                    ],
                    details: [
                        "Various Java related school projects including Quiz and Recipe mobile applications."
                    ],
                    github: "https://github.com/DuncanLevings/PersonalWork/tree/master/Java/School",
                    completed: true,
                    date: "" // used for mongodb retrival
                },
                {
                    title: "School Assignments",
                    icon: "javascript",
                    context: "Various assignments using Javascript.",
                    dateStart: "2018",
                    dateEnd: "2018",
                    languages: [
                        {
                            icon: "javascript",
                            text: "Javascript"
                        },
                        {
                            icon: "",
                            text: "Cordova"
                        },
                        {
                            icon: "jquery",
                            text: "Jquery"
                        }
                    ],
                    tools: [
                        {
                            icon: "",
                            text: "Intellij IDEA"
                        }
                    ],
                    details: [
                        "Various Javascript related school projects including bouncing boxes and Parking data mobile application."
                    ],
                    github: "https://github.com/DuncanLevings/PersonalWork/tree/master/Web%20Development/School",
                    completed: true,
                    date: "" // used for mongodb retrival
                },
                {
                    title: "School Assignments",
                    icon: "cplusplus",
                    context: "Various assignments using C/C++.",
                    dateStart: "2018",
                    dateEnd: "2018",
                    languages: [
                        {
                            icon: "cplusplus",
                            text: "C++"
                        }
                    ],
                    tools: [
                        {
                            icon: "visualstudio",
                            text: "Visual Studio"
                        }
                    ],
                    details: [
                        "Various C++ related school projects including call service simulator and phonebook algorithm."
                    ],
                    github: "https://github.com/DuncanLevings/PersonalWork/tree/master/CPP/School",
                    completed: true,
                    date: "" // used for mongodb retrival
                },
                {
                    title: "School Assignments",
                    icon: "python",
                    context: "Various assignments using Python.",
                    dateStart: "2018",
                    dateEnd: "2018",
                    languages: [
                        {
                            icon: "python",
                            text: "Python"
                        }
                    ],
                    tools: [
                        {
                            icon: "",
                            text: "Python3"
                        }
                    ],
                    details: [
                        "Various Python related school projects using Turtle framework to draw sine wave and Hex to IP/protocol/port conversion."
                    ],
                    github: "https://github.com/DuncanLevings/PersonalWork/tree/master/Python/School",
                    completed: true,
                    date: "" // used for mongodb retrival
                },
                {
                    title: "Recipe Plus",
                    icon: "android",
                    context: "Android App for creating recipes.",
                    dateStart: "Oct 2018",
                    dateEnd: "Dec 2018",
                    languages: [
                        {
                            icon: "android",
                            text: "Android"
                        },
                        {
                            icon: "java",
                            text: "Java"
                        }
                    ],
                    tools: [
                        {
                            icon: "",
                            text: "Android Studio"
                        }
                    ],
                    details: [
                        "Android application allowing creation of recipes including image and step details.",
                        "Created recipes can be uploaded to a hosted server where other users can download and view recipe."
                    ],
                    github: "https://github.com/DuncanLevings/PersonalWork/tree/master/Java/School/RecipePlus",
                    completed: true,
                    date: "" // used for mongodb retrival
                },
                {
                    title: "Inner Hero",
                    icon: "csharp",
                    context: "Capstone project, fully functional Unity game.",
                    dateStart: "Apr 2016",
                    dateEnd: "Aug 2016",
                    languages: [
                        {
                            icon: "csharp",
                            text: "C#"
                        }
                    ],
                    tools: [
                        {
                            icon: "",
                            text: "Unity"
                        }
                    ],
                    details: [
                        "Android game created in Unity in team of 4 students, comprised of top down 3D view of game world.",
                        "Player is set in dungeons where they must fight their way out and collect loot to upgrade abilties.",
                        "Autonomous play avaliable to user where player character will navigate and complete dungeon without user action required.",
                        "AI utilizes state machine and breath-first-search algothrim to map effective route in randomized dungeons."
                    ],
                    github: "https://github.com/DuncanLevings/PersonalWork/tree/master/CS/School/InnerHero",
                    completed: true,
                    date: "" // used for mongodb retrival
                },
                {
                    title: "Darkest Dungeon",
                    icon: "csharp",
                    context: "Unity game with multiplayer",
                    dateStart: "Jan 2016",
                    dateEnd: "Apr 2016",
                    languages: [
                        {
                            icon: "csharp",
                            text: "C#"
                        }
                    ],
                    tools: [
                        {
                            icon: "",
                            text: "Unity"
                        }
                    ],
                    details: [
                        "iOS game created in Unity in team of 3 students, comprised of 2D side scrolling view.",
                        "Player must battle through enemies with dark souls inspired combat difficulty to clear the level.",
                        "Multiplayer through Photon network to allow up to 3 other players to connect to game lobby.",
                        "AI helper utilizes state machine and player/monster proximity checks to help player clear the game."
                    ],
                    github: "https://github.com/DuncanLevings/PersonalWork/tree/master/CS/School/DarkestDungeon",
                    completed: true,
                    date: "" // used for mongodb retrival
                },
                {
                    title: "AutoHotkey Scripts",
                    icon: "github",
                    context: "AHK scripts",
                    dateStart: "TBD",
                    dateEnd: "TBD",
                    languages: [
                        {
                            icon: "",
                            text: "AHK"
                        }
                    ],
                    tools: [
                        {
                            icon: "",
                            text: "AutoHotKey"
                        }
                    ],
                    details: [
                        "Various scripts created to automize and simplify repetitive tasks in various games.",
                        "Scripts include, save exiting to menu and resume play, rebinding keys and smoother input combinations.",
                        "Fully automated completion of various game levels, color pixel detection for automated input action."
                    ],
                    github: "https://github.com/DuncanLevings/PersonalWork/tree/master/Scripts",
                    completed: true,
                    date: "" // used for mongodb retrival
                },
                {
                    title: "Lua Scripts",
                    icon: "github",
                    context: "Lua scripts",
                    dateStart: "TBD",
                    dateEnd: "TBD",
                    languages: [
                        {
                            icon: "",
                            text: "Lua"
                        }
                    ],
                    tools: [
                        {
                            icon: "",
                            text: "Lua"
                        }
                    ],
                    details: [
                        "Various scripts created with Lua utilizing Minecraft OpenComputerOS framework as base of script.",
                        "Scripts made to work with various Minecraft player mods to enhance usage with them.",
                        "Scripts include, automated detection of crafting tasks and materials needed.",
                        "Peer to peer server communication and packet sending between servers.",
                        "Status and maintenance monitoring of remote locations."
                    ],
                    github: "https://github.com/DuncanLevings/Minecraft/tree/master/Lua/Apps",
                    completed: true,
                    date: "" // used for mongodb retrival
                }
            ],
            filter: [],
            showModal: false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.updateActiveHash(RESUME_ROUTES.HASH_PORTFOLIO);

        if (this.props.match.params.project > -1) {
            this.setState({ showModal: true, selectedProject: this.state.projects[this.props.match.params.project] })
            this.props.history.replace("/portfolio") // clear the optional url param
        }
    }

    showModal = (bool, index = -1) => {
        this.setState({ showModal: bool });
        if (index > -1) {
            if (this.state.filter.length > 0) {
                const filtered = this.state.projects.filter(project => this.state.filter.includes(project.icon));
                this.setState({ selectedProject: filtered[index] });
            } else this.setState({ selectedProject: this.state.projects[index] });
        }
    }

    filterSlot = i => {
        const iconType = this.state.languages[i].icon;
        const filter = this.state.filter;
        // remove if already selected
        if (filter.includes(iconType)) {
            this.setState({ filter: filter.filter((icon) => { return icon !== iconType }) })
        } else {
            this.setState(prevState => ({ filter: [...prevState.filter, iconType] }))
        }
    }

    filterProject = () => {
        return this.state.projects
            .filter(project => this.state.filter.length < 1 || this.state.filter.includes(project.icon))
            .map((project, i) =>
                <Card className="portfolio-card" key={i} onClick={() => this.showModal(true, i)}>
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
    }

    render() {
        const { showModal, selectedProject, filter } = this.state;
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
                                    <div className={`language-container ${filter.includes(language.icon) ? 'selected' : ''}`} onClick={() => this.filterSlot(i)}>
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
                    <hr className="portfolio-divider" />
                    <div className="d-none d-xl-block spacer-h-3" />
                    <CardDeck>
                        {this.filterProject()}
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
