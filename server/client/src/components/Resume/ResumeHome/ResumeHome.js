/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React, { useLayoutEffect, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isMobile } from 'react-device-detect';
import { useInView } from 'react-intersection-observer';
import { ParallaxBanner, useController } from 'react-scroll-parallax';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { Image, Container, Row, Col, Button, ProgressBar, Modal } from 'react-bootstrap';
import { FaDownload, FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import { updateActiveHash } from 'store/actions/navbarActions';
import { RESUME_ROUTES } from 'consts/Resume_Consts';
import { RSTOOL_ROOT } from 'consts';
import Contact from '../Contact/Contact.lazy';
import 'react-vertical-timeline-component/style.min.css';
import './ResumeHome.scss';

const ParallaxCache = () => {
    const { parallaxController } = useController();
 
    useLayoutEffect(() => {
        const handler = () => parallaxController.update();
        window.addEventListener('load', handler);
        return () => window.removeEventListener('load', handler);
    }, [parallaxController]);
 
    return null;
};

const _RenderInViewSection = (props) => {
    const [ref, inView, entry] = useInView({
        threshold: 1
    });

    useEffect(() => {
        if (inView) props.updateActiveHash(props.hashLocation);
    });

    return (
        <div ref={ref} />
    );
}

_RenderInViewSection.propTypes = {
    updateActiveHash: PropTypes.func
};
const mapDispatchToProps = dispatch => bindActionCreators({ updateActiveHash }, dispatch);
const RenderInViewSection = connect(null, mapDispatchToProps)(_RenderInViewSection);

const RenderProgBar = (props) => {
    let curr = 0;

    if (typeof window.IntersectionObserver === 'undefined' || isMobile) {
        curr = props.amount;
    }

    const [ref, inView, entry] = useInView({
        threshold: 1,
        rootMargin: "0px 0px -25px 0px",
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

const ReferenceModal = props => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName="reference"
            centered
        >
            <Modal.Body>
                <p>
                    Jack Yan<br/>
                    Suite 406<br/>
                    Toronto, 263 Adelaide Street West, ON M5H 1Y2<br/>
                    jack@zhyinteractive.com
                </p>
                <p>
                    Dear Hiring Manager,
                </p>
                <p>
                    I am the Founder of ZHY Interactive Incorporated, a technology holding company based in Toronto. 
                    It is with great enthusiasm that I am writing this letter for <b>Duncan Levings</b>’ application to your company. 
                </p>
                <p>
                    Duncan worked as a Software Engineer at ZHY Interactive Incorporated from January 1, 2020 to April 30, 2020. 
                    During this time he contributed towards the development and launch of key features for Royaltymine, an 
                    industry leading crowdfunding platform for musicians. He fulfilled this role with professionalism and 
                    continuously demonstrated enthusiasm towards working with his peers and completing tasks assigned to him. 
                    He also demonstrated value right from the beginning of his internship by obtaining a working understanding of 
                    React and MongoDB without much prior knowledge in a very short amount of time.
                </p>
                <p>
                    He was able to quickly pick up important business implications when writing code, making him an integral part 
                    of our team. He contributed greatly to the design and implementation of Royaltymine’s music licensing services 
                    and royalty distribution services, which are Royaltymine’s two key offerings. Furthermore, he was able to improve 
                    several behind the scenes services by making them more effective and secure.
                </p>
                <p>
                    I have the utmost confidence that Duncan will excel in whatever task he is provided with as he has demonstrated the 
                    ability to learn quickly on the job and the ability to identify key issues whose resolution will greatly 
                    accelerate the development process. 
                </p>
                <p>
                    Sincerely,
                </p>
                <p>
                    Jack Yan
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
  }

class ResumeHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            referenceShow: false
        }
    }

    componentDidMount() {
        if (isMobile) {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        } else {
            if (window.innerHeight < 850) this.setState({ smallScreen: true});
        }
    }

    renderHome = () => {
        const { smallScreen } = this.state;

        if (isMobile) {
            return (
                <Container className="content">
                    <RenderInViewSection hashLocation={"home"} />
                    <Row>
                        <Col xs={12}>
                            <Row>
                                <div className="profileImgContainer mb-4 mx-auto">
                                    <Image className="profileImg" src="/static_images/cropped.png" roundedCircle />
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
                <RenderInViewSection hashLocation={"home"} />
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
                            <Image className="profileImg" src="/static_images/cropped.png" roundedCircle />
                        </div>
                    </Col>
                </Row>
                {smallScreen ? null :
                    <div className="aboutme">
                        <span className="text aboutme-text">
                            I am a motivated and challenge-seeking person who has been programming since 2010.<br /><br />
                            I thoroughly enjoy all programming aspects and communities. Taking concepts and translating them into tangible,
                            workable applications is what motivates me. It’s exciting to bring ideas to life, and allow people to share in these experiences.
                        </span>
                        <hr className="divider" />
                        <div className="centered-button-container">
                            <Button variant="button-primary"><FaDownload /> Resume</Button>
                        </div>
                    </div>
                }
            </Container>
        );
    }

    renderProfessional = () => {
        if (isMobile) {
            return (
                <Container className="content">
                    <RenderInViewSection hashLocation={"professional"} />
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
                    <div className="spacer-h-4" />
                    <Row>
                        <Col xs={4} className="pr-1">
                            <div className="bar-head">
                                <span className="text body-text">
                                        JAVASCRIPT
                                </span>
                            </div>
                        </Col>
                        <Col xs={8}>
                            <RenderProgBar amount={90} />
                        </Col>
                    </Row>
                    <div className="spacer-h-2" />
                    <Row>
                        <Col xs={4} className="pr-1">
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
                    <div className="spacer-h-2" />
                    <Row>
                        <Col xs={4} className="pr-1">
                            <div className="bar-head">
                                <span className="text body-text">
                                        ANGULAR
                                </span>
                            </div>
                        </Col>
                        <Col xs={8}>
                            <RenderProgBar amount={80} />
                        </Col>
                    </Row>
                    <div className="spacer-h-2" />
                    <Row>
                        <Col xs={4} className="pr-1">
                            <div className="bar-head">
                                <span className="text body-text">
                                        HTML/CSS
                                </span>
                            </div>
                        </Col>
                        <Col xs={8}>
                            <RenderProgBar amount={85} />
                        </Col>
                    </Row>
                    <div className="spacer-h-2" />
                    <Row>
                        <Col xs={4} className="pr-1">
                            <div className="bar-head">
                                <span className="text body-text">
                                        MONGO
                                </span>
                            </div>
                        </Col>
                        <Col xs={8}>
                            <RenderProgBar amount={75} />
                        </Col>
                    </Row>
                    <div className="spacer-h-2" />
                    <Row>
                        <Col xs={4} className="pr-1">
                            <div className="bar-head">
                                <span className="text body-text">
                                        PYTHON
                                </span>
                            </div>
                        </Col>
                        <Col xs={8}>
                            <RenderProgBar amount={80} />
                        </Col>
                    </Row>
                    <div className="spacer-h-2" />
                    <Row>
                        <Col xs={4} className="pr-1">
                            <div className="bar-head">
                                <span className="text body-text">
                                        JAVA
                                </span>
                            </div>
                        </Col>
                        <Col xs={8}>
                            <RenderProgBar amount={70} />
                        </Col>
                    </Row>
                    <div className="spacer-h-2" />
                    <Row>
                        <Col xs={4} className="pr-1">
                            <div className="bar-head">
                                <span className="text body-text">
                                        C#
                                </span>
                            </div>
                        </Col>
                        <Col xs={8}>
                            <RenderProgBar amount={85} />
                        </Col>
                    </Row>
                    <div className="spacer-h-2" />
                    <Row>
                        <Col xs={4} className="pr-1">
                            <div className="bar-head">
                                <span className="text body-text">
                                        C/C++
                                </span>
                            </div>
                        </Col>
                        <Col xs={8}>
                            <RenderProgBar amount={60} />
                        </Col>
                    </Row>
                </Container>
            );
        }
        return (
            <Container className="content">
                <RenderInViewSection hashLocation={"professional"} />
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
                <div className="spacer-h-5" />
                <Row>
                    <Col xs={2}>
                        <div className="bar-head">
                            <span className="text body-text">
                                    JAVASCRIPT
                            </span>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <RenderProgBar amount={90} />
                    </Col>
                    <Col xs={2}>
                        <div className="bar-end">
                            <span className="ml-4 text body-text">
                                90%
                            </span>
                        </div>
                    </Col>
                </Row>
                <div className="spacer-h-2" />
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
                            <span className="ml-4 text body-text">
                                90%
                            </span>
                        </div>
                    </Col>
                </Row>
                <div className="spacer-h-2" />
                <Row>
                    <Col xs={2}>
                        <div className="bar-head">
                            <span className="text body-text">
                                    ANGULAR
                            </span>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <RenderProgBar amount={80} />
                    </Col>
                    <Col xs={2}>
                        <div className="bar-end">
                            <span className="ml-4 text body-text">
                                80%
                            </span>
                        </div>
                    </Col>
                </Row>
                <div className="spacer-h-2" />
                <Row>
                    <Col xs={2}>
                        <div className="bar-head">
                            <span className="text body-text">
                                    HTML/CSS
                            </span>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <RenderProgBar amount={85} />
                    </Col>
                    <Col xs={2}>
                        <div className="bar-end">
                            <span className="ml-4 text body-text">
                                85%
                            </span>
                        </div>
                    </Col>
                </Row>
                <div className="spacer-h-2" />
                <Row>
                    <Col xs={2}>
                        <div className="bar-head">
                            <span className="text body-text">
                                    MONGO
                            </span>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <RenderProgBar amount={75} />
                    </Col>
                    <Col xs={2}>
                        <div className="bar-end">
                            <span className="ml-4 text body-text">
                                75%
                            </span>
                        </div>
                    </Col>
                </Row>
                <div className="spacer-h-2" />
                <Row>
                    <Col xs={2}>
                        <div className="bar-head">
                            <span className="text body-text">
                                    PYTHON
                            </span>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <RenderProgBar amount={80} />
                    </Col>
                    <Col xs={2}>
                        <div className="bar-end">
                            <span className="ml-4 text body-text">
                                80%
                            </span>
                        </div>
                    </Col>
                </Row>
                <div className="spacer-h-2" />
                <Row>
                    <Col xs={2}>
                        <div className="bar-head">
                            <span className="text body-text">
                                    JAVA
                            </span>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <RenderProgBar amount={70} />
                    </Col>
                    <Col xs={2}>
                        <div className="bar-end">
                            <span className="ml-4 text body-text">
                                70%
                            </span>
                        </div>
                    </Col>
                </Row>
                <div className="spacer-h-2" />
                <Row>
                    <Col xs={2}>
                        <div className="bar-head">
                            <span className="text body-text">
                                    C#
                            </span>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <RenderProgBar amount={85} />
                    </Col>
                    <Col xs={2}>
                        <div className="bar-end">
                            <span className="ml-4 text body-text">
                                85%
                            </span>
                        </div>
                    </Col>
                </Row>
                <div className="spacer-h-2" />
                <Row>
                    <Col xs={2}>
                        <div className="bar-head">
                            <span className="text body-text">
                                    C/C++
                            </span>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <RenderProgBar amount={60} />
                    </Col>
                    <Col xs={2}>
                        <div className="bar-end">
                            <span className="ml-4 text body-text">
                                60%
                            </span>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

    renderExperience = () => {
        return (
            <div className="experience" id="experience">
                <Container className="content">
                    <RenderInViewSection hashLocation={"experience"} />
                    <Row>
                        <div className="center-head">
                            <span className="text body-head">
                                <span className="section-number">02</span> EXPERIENCE
                            </span>
                        </div>
                    </Row>
                    <div className="spacer-h-4" />
                    <VerticalTimeline className="vertical-timeline-custom-line" animate={!isMobile}>
                        <div className="timeline-circle top" />
                        <VerticalTimelineElement
                            dateClassName="timeline-date"
                            iconClassName="timeline-icon"
                            textClassName="timeline-container"
                            date="2020, Jan - present"
                            icon={<FaBriefcase />}
                            intersectionObserverProps={{ rootMargin: "0px 0px -200px 0px" }}
                        >
                            <h3 className="vertical-timeline-element-title title">Software Engineer</h3>
                            <h4 className="vertical-timeline-element-subtitle subtitle">ZHY Interactive</h4>
                            <div className="spacer-h-2" />
                            <ul>
                                <li>Worked with React to design, develop, test and deploy new features to 
                                    <a href="https://royaltymine.com/" rel="noopener noreferrer" target="_blank"> Royaltymine.com</a></li>
                                <li>Utilized MongoDB along with conventional standards in react services to develop new backend features</li>
                                <li>Integrated Aggregate functionality into the backend to significantly improve performance</li>
                                <li>Created new front-end pages using Ant design along with Bootstrap</li>
                                <li>Researched, designed and implemented JWT Token authentication for login and user access permissions</li>
                                <li>Using Socket.IO created connection streams for real-time notifications</li>
                            </ul>
                            <div className="centered-button-container">
                                <Button variant="button-primary" onClick={() => this.setReferenceShow(true)}>Reference Letter</Button>
                            </div>
                            <div className="spacer-h-2" />
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            dateClassName="timeline-date"
                            iconClassName="timeline-icon"
                            textClassName="timeline-container"
                            date="2019, Apr - 2019, Aug"
                            icon={<FaBriefcase />}
                            intersectionObserverProps={{ rootMargin: "0px 0px -200px 0px" }}
                        >
                            <h3 className="vertical-timeline-element-title title">Associate Information Technology Technician</h3>
                            <h4 className="vertical-timeline-element-subtitle subtitle">Genworth Canada</h4>
                            <div className="spacer-h-2" />
                            <ul>
                                <li>Worked with AngularJS to develop, maintain and produce front-end applications</li>
                                <li>Designed and implemented services, libraries and various components utilizing Angular Clarity and Angular Material framework</li>
                                <li>Created Karma test cases, Keycloak library, Storybook UI components and Docker files</li>
                                <li>Utilized tools such as: Jira, Gitlab and npm</li>
                                <li>Collaborated with Rangle.IO developers in designing and implementing a Genworth application</li>
                                <li>Worked with back-end team to develop new back-end service points using Java and bootstrap</li>
                            </ul>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            dateClassName="timeline-date"
                            iconClassName="timeline-icon"
                            textClassName="timeline-container"
                            date="2018, Jan - present"
                            icon={<FaGraduationCap />}
                            intersectionObserverProps={{ rootMargin: "0px 0px -200px 0px" }}
                        >
                            <h3 className="vertical-timeline-element-title title">Bachelor's degree of Computer Science</h3>
                            <h4 className="vertical-timeline-element-subtitle subtitle">Sheridan College</h4>
                            <div className="spacer-h-2" />
                            <ul>
                                <li>Expected graduation 2021, Dec</li>
                            </ul>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            dateClassName="timeline-date"
                            iconClassName="timeline-icon"
                            textClassName="timeline-container"
                            date="2015, Sep - 2016, Aug"
                            icon={<FaGraduationCap />}
                            intersectionObserverProps={{ rootMargin: "0px 0px -200px 0px" }}
                        >
                            <h3 className="vertical-timeline-element-title title">Certificate of Advanced Programming: Game Development</h3>
                            <h4 className="vertical-timeline-element-subtitle subtitle">Sheridan College</h4>
                            <div className="spacer-h-2" />
                            <ul>
                                <li>Focused on C++, Unity, OpenGL and creation of tools for the development of games</li>
                                <li>Using Unity engine, created multiple games including android and iOS multiplayer aspects</li>
                                <li>Major capstone involved team of four members to create a fully functional Android game</li>
                            </ul>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            dateClassName="timeline-date"
                            iconClassName="timeline-icon"
                            textClassName="timeline-container"
                            date="2013, Sep - 2015, Apr"
                            icon={<FaGraduationCap />}
                            intersectionObserverProps={{ rootMargin: "0px 0px -200px 0px" }}
                        >
                            <h3 className="vertical-timeline-element-title title">Ontario College Diploma of Computer Programming</h3>
                            <h4 className="vertical-timeline-element-subtitle subtitle">Sheridan College</h4>
                            <div className="spacer-h-2" />
                            <ul>
                                <li>Studied Java, Javascript, HTML5, and C#</li>
                                <li>Developed a sound understanding of mathematical computing, web development, object oriented programming, Linux, and Unix, UI design, network, SQL, UML, and IT management</li>
                            </ul>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            dateClassName="timeline-date"
                            iconClassName="timeline-icon"
                            textClassName="timeline-container"
                            date="2013, May - 2013, Aug"
                            icon={<FaBriefcase />}
                            intersectionObserverProps={{ rootMargin: "0px 0px -200px 0px" }}
                        >
                            <h3 className="vertical-timeline-element-title title">Summer Student; Operations Administration</h3>
                            <h4 className="vertical-timeline-element-subtitle subtitle">Genworth Canada</h4>
                            <div className="spacer-h-2" />
                            <ul>
                                <li>Worked in the underwriting department assisting with general data entry and collation tasks</li>
                                <li>Improved processes, reduced storage use and increased productivity through the creation of Excel scripts</li>
                            </ul>
                        </VerticalTimelineElement>
                        <div className="timeline-circle bottom" />
                    </VerticalTimeline>
                    <RenderInViewSection hashLocation={"experience"} />
                </Container>
            </div>
        );
    }

    renderPortfolio = () => {
        if (isMobile) {
            return (
                <div className="portfolio" id="portfolio">
                    <Container className="content">
                        <RenderInViewSection hashLocation={"portfolio"} />
                            <Row>
                                <div className="center-head">
                                    <span className="text body-head">
                                        <span className="section-number">03</span> PORTFOLIO
                                    </span>
                                </div>
                            </Row>
                            <Row>
                                <div className="center-head">
                                    <span className="text body-sub-head">
                                        MY LATEST WORK. <Link to={RESUME_ROUTES.PORTFOLIO} className="section-number">SEE MORE &gt;</Link>
                                    </span>
                                </div>
                            </Row>
                            <div className="spacer-h-5" />
                            <Row>
                                <Col className="portfolio-image-container">
                                    <div className="portfolio-box-container">
                                        <Link to={RSTOOL_ROOT} className="portfolio-link first">RSTools</Link>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="portfolio-image-container">
                                    <div className="portfolio-box-container">
                                        <Link to={"/"} className="portfolio-link second">RSTools</Link>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="portfolio-image-container">
                                    <div className="portfolio-box-container">
                                        <Link to={"/"} className="portfolio-link third">RSTools</Link>
                                    </div>
                                </Col>
                            </Row>
                    </Container>
                </div>
            );
        }
        return (
            <div className="portfolio" id="portfolio">
                <Container className="content">
                    <RenderInViewSection hashLocation={"portfolio"} />
                    <Row>
                        <div className="center-head">
                            <span className="text body-head">
                                <span className="section-number">03</span> PORTFOLIO
                            </span>
                        </div>
                    </Row>
                    <Row>
                        <div className="center-head">
                            <span className="text body-sub-head">
                                MY LATEST WORK. <Link to={RESUME_ROUTES.PORTFOLIO} className="section-number">SEE MORE &gt;</Link>
                            </span>
                        </div>
                    </Row>
                    <div className="spacer-h-5" />
                    <Row className="portfolio-box-container ml-3 mr-3">
                        <Col className="portfolio-image-container">
                            <Link to={RSTOOL_ROOT} className="portfolio-link first">RSTools</Link>
                        </Col>
                        <Col className="portfolio-image-container">
                            <Link to={"/"} className="portfolio-link second">RSTools</Link>
                        </Col>
                        <Col className="portfolio-image-container">
                            <Link to={"/"} className="portfolio-link third">RSTools</Link>
                        </Col>
                    </Row>
                    {/* <div>
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
                    </div> */}
                </Container>
            </div>
        );
    }

    renderContact = () => {
        return (
            <Container className="content">
                <div className="contact-head" id="contact" />
                <div className="contact-container">
                    <RenderInViewSection hashLocation={"contact"} />
                    <Contact />
                </div>
            </Container>
        );
    }

    setReferenceShow = bool => {
        this.setState({ referenceShow: bool });
    }

    render() {
        const { smallScreen, referenceShow } = this.state;
        return (
            <div>
                <ParallaxCache />
                <ReferenceModal
                    show={referenceShow}
                    onHide={() => this.setReferenceShow(false)}
                />
                <div className="ResumeHome" id="home">
                    <ParallaxBanner
                        className="home"
                        disabled={isMobile}
                        layers={[
                            {
                                image: "/static_images/tokyo_night_city.jpg",
                                amount: 0.4
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
                        <hr className="divider" />
                        <div className="centered-button-container">
                            <Button variant="button-primary"><FaDownload /> Resume</Button>
                        </div>
                    </div>
                    : null}
                    <div id="professional" />
                    <ParallaxBanner
                        className="professional"
                        disabled={isMobile}
                        layers={[
                            {
                                image: "/static_images/desk.jpg",
                                amount: 0.4,
                                props: {style: {opacity: 0.45}}
                            }
                        ]}
                        style={{
                            height: '100%',
                        }}
                    >
                        {this.renderProfessional()}
                    </ParallaxBanner>
                    {this.renderExperience()}
                    {this.renderPortfolio()}
                    <ParallaxBanner
                        className="contact"
                        disabled={isMobile}
                        layers={[
                            {
                                image: "/static_images/footer.jpg",
                                amount: 0.5,
                                props: {style: {opacity: 0.45}}
                            }
                        ]}
                    >
                        {this.renderContact()}
                    </ParallaxBanner>
                </div>
            </div>
        );
    }
}

export default ResumeHome;
