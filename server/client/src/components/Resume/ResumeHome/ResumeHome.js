/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { RSTOOL_ROOT } from 'consts';
import { isMobile } from 'react-device-detect';
import { Image, Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import { ParallaxBanner } from 'react-scroll-parallax';
import { FaDownload } from 'react-icons/fa';
import Fade from 'react-reveal/Fade';
import './ResumeHome.scss';
import { useInView } from 'react-intersection-observer';

const RenderProgBar = (props) => {
    let curr = 0;

    if (typeof window.IntersectionObserver === 'undefined' || isMobile) {
        curr = props.amount;
    }

    const [ref, inView, entry] = useInView({
        threshold: 1,
        triggerOnce: true
      });

    if (inView) {
        curr = props.amount;
    }

    return (
        <div ref={ref} className="bar">
            <ProgressBar variant="bar-primary" label={isMobile ? `${curr}%` : null} now={curr} />
        </div>
    );
}

class ResumeHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        if (isMobile) {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        } else {
            if (window.innerHeight < 780) this.setState({ smallScreen: true});
        }
    }

    renderHome = () => {
        const { smallScreen } = this.state;

        if (isMobile) {
            return (
                <Container className="content">
                    <Row>
                        <Col xs={12}>
                            <Row>
                                <div className="profileImgContainer mb-4 mx-auto">
                                    <Image className="profileImg" src="/cropped.png" roundedCircle />
                                </div>
                            </Row>
                            <Row>
                                <span className="text main-head mx-auto">
                                    I'M
                                </span>
                            </Row>
                            <Row>
                                <span className="text main-head mx-auto">
                                    DUNCAN
                                </span>
                            </Row>
                            <Row>
                                <span className="text main-head mx-auto">
                                    LEVINGS
                                </span>
                            </Row>
                            <Row>
                                <span className="text sub-head mx-auto">
                                    SOFTWARE ENGINEER
                                </span>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            );
        }
        return (
            <Container className="content">
                <Row>
                    <Col xs={12} md={6}>
                        <Row>
                            <span className="text main-head">
                                I'M
                            </span>
                        </Row>
                        <Row>
                            <span className="text main-head">
                                DUNCAN
                            </span>
                        </Row>
                        <Row>
                            <span className="text main-head">
                                LEVINGS.
                            </span>
                        </Row>
                        <Row>
                            <span className="text sub-head">
                                SOFTWARE ENGINEER
                            </span>
                        </Row>
                    </Col>
                    <Col xs={0} md={6}>
                        <div className="profileImgContainer">
                            <Image className="profileImg" src="/cropped.png" roundedCircle />
                        </div>
                    </Col>
                </Row>
                {smallScreen ? 
                null :
                    <div className="aboutme">
                        <Row>
                            <Col md={12}>
                                <span className="text aboutme-text">
                                    I am a motivated and challenge-seeking person who has been programming since 2010.<br/><br/>
                                    I thoroughly enjoy all programming aspects and communities. Taking concepts and translating them into tangible,
                                    workable applications is what motivates me. It’s exciting to bring ideas to life, and allow people to share in these experiences.
                                </span>
                            </Col>
                            {/* <Col md={2} className="my-auto">
                                <Button variant="button-primary" className="resume-button"><FaDownload /> Resume</Button>
                            </Col> */}
                        </Row>
                    </div>
                }
            </Container>
        );
    }

    renderProfessional = () => {
        if (isMobile) {
            return (
                <Container className="content">
                    <Row>
                        <div className="center-head">
                            <span className="text body-head">
                                <span className="section-number">01</span> PROFESSIONAL
                            </span>
                        </div>
                    </Row>
                    <Row>
                        <div className="center-head">
                            <span className="text body-sub-head">
                                MY KNOWLEDGE LEVEL IN SOFTWARE
                            </span>
                        </div>
                    </Row>
                    <div className="spacer-4" />
                    <Row>
                        <Col xs={4}>
                            <div className="bar-head">
                                <span className="text body-text">
                                        JAVASCRIPT
                                </span>
                            </div>
                        </Col>
                        <Col xs={8}>
                            <RenderProgBar amount={80} />
                        </Col>
                    </Row>
                    <div className="spacer-2" />
                    <Row>
                        <Col xs={4}>
                            <div className="bar-head">
                                <span className="text body-text">
                                        REACT
                                </span>
                            </div>
                        </Col>
                        <Col xs={8}>
                            <RenderProgBar amount={90} />
                        </Col>
                    </Row>
                    <div className="spacer-2" />
                    <Row>
                        <Col xs={4}>
                            <div className="bar-head">
                                <span className="text body-text">
                                        TEST
                                </span>
                            </div>
                        </Col>
                        <Col xs={8}>
                            <RenderProgBar amount={75} />
                        </Col>
                    </Row>
                    <div className="spacer-2" />
                    <Row>
                        <Col xs={4}>
                            <div className="bar-head">
                                <span className="text body-text">
                                        TEST
                                </span>
                            </div>
                        </Col>
                        <Col xs={8}>
                            <RenderProgBar amount={50} />
                        </Col>
                    </Row>
                </Container>
            );
        }
        return (
            <Container className="content">
                <Row>
                    <div className="center-head">
                        <span className="text body-head">
                            <span className="section-number">01</span> PROFESSIONAL
                        </span>
                    </div>
                </Row>
                <Row>
                    <div className="center-head">
                        <span className="text body-sub-head">
                            MY KNOWLEDGE LEVEL IN SOFTWARE
                        </span>
                    </div>
                </Row>
                <div className="spacer-5" />
                <Row>
                    <Col xs={2}>
                        <div className="bar-head">
                            <span className="text body-text">
                                    JAVASCRIPT
                            </span>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <RenderProgBar amount={80} />
                    </Col>
                    <Col xs={2}>
                        <div className="bar-end">
                            <Fade delay={100} disabled={isMobile}>
                                <span className="ml-4 text body-text">
                                    80%
                                </span>
                            </Fade>
                        </div>
                    </Col>
                </Row>
                <div className="spacer-2" />
                <Row>
                    <Col xs={2}>
                        <div className="bar-head">
                            <span className="text body-text">
                                    REACT
                            </span>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <RenderProgBar amount={90} />
                    </Col>
                    <Col xs={2}>
                        <div className="bar-end">
                            <Fade delay={200} disabled={isMobile}>
                                <span className="ml-4 text body-text">
                                    90%
                                </span>
                            </Fade>
                        </div>
                    </Col>
                </Row>
                <div className="spacer-2" />
                <Row>
                    <Col xs={2}>
                        <div className="bar-head">
                            <span className="text body-text">
                                    TEST
                            </span>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <RenderProgBar amount={75} />
                    </Col>
                    <Col xs={2}>
                        <div className="bar-end">
                            <Fade delay={300} disabled={isMobile}>
                                <span className="ml-4 text body-text">
                                    75%
                                </span>
                            </Fade>
                        </div>
                    </Col>
                </Row>
                <div className="spacer-2" />
                <Row>
                    <Col xs={2}>
                        <div className="bar-head">
                            <span className="text body-text">
                                    TEST
                            </span>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <RenderProgBar amount={50} />
                    </Col>
                    <Col xs={2}>
                        <div className="bar-end">
                            <Fade delay={400} disabled={isMobile}>
                                <span className="ml-4 text body-text">
                                    50%
                                </span>
                            </Fade>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

    render() {
        const { smallScreen } = this.state;

        return (
            <div>
                <div className="ResumeHome" id='home'>
                <ParallaxBanner
                    className="home"
                    disabled={isMobile}
                    layers={[
                        {
                            image: "/tokyo_night_city.jpg",
                            amount: 0.3
                        }
                    ]}
                >
                    {this.renderHome()}
                </ParallaxBanner>
                {isMobile || smallScreen ?
                <div className="aboutme-mobile">
                    <span className="text aboutme-text">
                        I am a motivated and challenge-seeking person who has been programming since 2010.<br/><br/>
                        I thoroughly enjoy all programming aspects and communities. Taking concepts and translating them into tangible,
                        workable applications is what motivates me. It’s exciting to bring ideas to life, and allow people to share in these experiences.
                    </span>
                    <hr />
                    <div className="mobile-resume-button">
                        <Button variant="button-primary" className="resume-button"><FaDownload /> Resume</Button>
                    </div>
                </div>
                : null}
                <div id="professional"/>
                <ParallaxBanner
                    className="professional"
                    disabled={isMobile}
                    layers={[
                        {
                            image: "/desk.jpg",
                            amount: 0.3,
                            props: {style: {opacity: 0.45}}
                        }
                    ]}
                >
                    {this.renderProfessional()}
                </ParallaxBanner>
                    <h1>Education</h1>
                    <p className="small-font">
                    Sheridan College<br />
                    Bachelor's degree of Computer Science<br />
                    2018 – 2021<br />
                    <br />
                    Sheridan College<br />
                    Certificate of Advanced Programming: Game Development<br />
                    2015 – 2016<br />
                    <br />
                    Sheridan College<br />
                    Ontario College Diploma of Computer Programming<br />
                    2013 – 2015<br />
                    </p>
                    <h1 id="experience">Experience</h1>
                    <p className="small-font">
                        Software Engineer<br />
                        ZHY Interactive Contract<br />
                        Jan 2020 – Apr 2020<br />
                        Toronto<br /><br />
                        • Worked with React to design, develop, test and deploy new features to Royaltymine.com.<br />
                        • Utilized MongoDB along with conventional standards in react services to develop new backend features.<br />
                        • Integrated Aggregate functionality into the backend to significantly improve performance.<br />
                        • Created new front-end pages using Ant design along with Bootstrap.<br />
                        • Researched, designed and implemented JWT Token authentication for login and user access permissions.<br />
                        • Using Socket.IO created connection streams for real-time notifications.<br />
                    </p>
                    <br />
                    <p className="small-font">
                        Associate Information Technology Technician<br />
                        Genworth Canada<br />
                        2019 – Aug 2019<br />
                        Oakville<br /><br />
                        • Worked with AngularJS to develop, maintain and produce front-end applications.<br />
                        • Designed and implemented services, libraries and various components utilizing Angular Clarity and Angular Material framework.<br />
                        • Created Karma test cases, Keycloak library, Storybook UI components and Docker files.<br />
                        • Utilized tools such as: Jira, Gitlab and npm.<br />
                        • Collaborated with Rangle.IO developers in designing and implementing a Genworth application.<br />
                        • Worked with back-end team to develop new back-end service points using Java and bootstrap.<br />
                    </p>
                    <h1 id="portfolio">Projects</h1>
                    <p className="small-font">
                        <b>RSTools</b><br />
                        May 2020 – Current<br />
                        Work in progress tools website <Link to={RSTOOL_ROOT}>Link to site</Link>
                    </p>
                    <br />
                    <p className="small-font">
                        <b>Find A Spot</b><br />
                        Jan 2019 – Apr 2019<br />
                        Designed and developed a mobile application that uses map API to find nearby 
                        parking organized by user preferred price and distance settings.<br /><br />
                        • Utilizes ParkWhiz API and Google Map API.<br />
                        • Developed using IntelliJ IDEA with Cordova framework.<br />
                        • User data is stored in Google FireBase and images in local phone storage.<br />
                        • Uses Geolocation to appropriately set nearby parking parameters.<br />
                    </p>
                    <br />
                    <p className="small-font">
                        <b>Inner Hero</b><br />
                        Apr 2016 – Aug 2016<br /><br />
                        • Collaborated with four members, including three programmers, and one designer from the Game Level 
                        Design program, to develop and produce an original Android mobile game, currently available through Android Apps on Google Play.<br />
                        • Completed the project in four months, logging 7-8 hours of work each day, five days per week.<br />
                        • Developed and executed all gameplay with the main section, including interactive elements, 
                        path-finding for players and enemies, main combat systems (including elements from Fruit Ninja), and UI elements (quick slot, toggle, and other buttons).<br />
                        • Created AI for the main player, enabling intervention and command. Incorporated the ability for the user to set the phone down while play continued.<br />
                        • Developed unique systems that operated during run time, mapped out and generated logical 
                        lists of interest points to allow automatic exploration, created a dynamic and random behaviour of bosses, and options to select 40 different abilities.<br />
                        • Identified and selected algorithmic, programming, and mathematical techniques to develop systems for various aspects of the game.<br />
                        • Created prototypes with existing professional tools, such as game engines, middleware, and common application programming interfaces.<br />
                        • Leveraged collaborative tools related to industry practices, including source control, build management, deployment, and bug tracking.<br />
                        • Utilized project management skills, including development tasks and team member interactions.<br />
                        • Tested, debugged, and optimized game and components to meet production requirements and time constraints.<br />
                    </p>
                    <br />
                    <p className="small-font">
                        <b>Darkest Dungeon</b><br />
                        Jan 2016 – Apr 2016<br /><br />
                        • Collaborated on a mobile game project with two team members, leveraging the multi-platform game development tool, Unity.<br />
                        • Accountable for the multiplayer portion of development, using Unity’s Photon classes, UI elements 
                        (bag system and in-game menus), and large components of AI, including a smart AI-controlled player assist.<br />
                        • The game was developed to include up to four players simultaneously, allowing joining in a lobby, 
                        fighting between users, and playing in a collaborative manner to complete the main dungeon quest.<br />
                    </p>
                    <h1 id="contact">Contact Me</h1>
                    <p>
                        Duncan.levings@gmail.com<br />
                        <a href="https://github.com/DuncanLevings">Github</a><br />
                        <a href="https://www.linkedin.com/in/duncan-levings/">LinkedIn</a>
                    </p>
                </div>
                <span className="temp-disclaim">*DISCLAIMER* Website is a work in progress</span>
                <div className="temp-footer">
                    <span>Copyright (c) 2020 DuncanLevings <br/> Updated: June 8 2020</span>
                </div>
            </div>
        );
    }
}

export default ResumeHome;
