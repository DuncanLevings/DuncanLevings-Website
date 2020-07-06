/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React, { useLayoutEffect, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isMobileOnly, isMobile } from 'react-device-detect';
import { useInView } from 'react-intersection-observer';
import { ParallaxBanner, useController } from 'react-scroll-parallax';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { Image, Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import { FaDownload, FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import { updateActiveHash } from 'store/actions/navbarActions';
import { RESUME_ROUTES } from 'consts/Resume_Consts';
import Contact from '../Contact/Contact.lazy';
import 'react-vertical-timeline-component/style.min.css';
import './ResumeHome.scss';
import ReferenceModal from '../ReferenceModal/ReferenceModal.lazy';

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
    const [ref, inView] = useInView({
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

    const [ref, inView] = useInView({
        threshold: 1,
        rootMargin: "0px 0px -25px 0px",
        triggerOnce: true
    });

    if (inView) {
        curr = props.amount;
    }

    return (
        <div ref={ref} className="bar">
            <ProgressBar variant="bar-primary" label={isMobileOnly ? `${curr}%` : null} now={curr} />
        </div>
    );
}

class ResumeHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            referenceShow: false,
            modalWrapper: createRef(),
            // BELOW WILL COME FROM DB
            profile_img: "/static_images/cropped.png",
            job_title: "SOFTWARE ENGINEER",
            home_blurb: 
            `I am a motivated and challenge-seeking person who has been programming since 2010.

            I thoroughly enjoy all programming aspects and communities. Taking concepts and translating them into tangible, workable applications is what motivates me. It’s exciting to bring ideas to life, and allow people to share in these experiences.`,
            professional: [
                {
                    skill: "JAVASCRIPT",
                    amount: 90
                },
                {
                    skill: "REACT",
                    amount: 90
                },
                {
                    skill: "ANGULAR",
                    amount: 80
                },
                {
                    skill: "HTML/CSS",
                    amount: 85
                },
                {
                    skill: "MONGODB",
                    amount: 75
                },
                {
                    skill: "PYTHON",
                    amount: 80
                },
                {
                    skill: "JAVA",
                    amount: 70
                },
                {
                    skill: "C#",
                    amount: 85
                },
                {
                    skill: "C/C++",
                    amount: 60
                }
            ],
            experience: [
                {
                    type: 1, // 1 for job, 0 for education
                    dateStart: "2020, Jan",
                    dateEnd: "2020, June",
                    date: "", // for mongo retreival,
                    title: "Software Engineer",
                    subtitle: "ZHY Interactive",
                    details: [
                        "Worked with React to design, develop, test and deploy new features to Royaltymine.",
                        "Utilized MongoDB along with conventional standards in react services to develop new backend features.",
                        "Integrated Aggregate functionality into the backend to significantly improve performance.",
                        "Created new front-end pages using Ant design along with Bootstrap.",
                        "Researched, designed and implemented JWT Token authentication for login and user access permissions.",
                        "Using Socket.IO created connection streams for real-time notifications."
                    ],
                    hasReference: true // if true, show button, get selected experince on click, pass object _id to populate reference modal
                },
                {
                    type: 1, // 1 for job, 0 for education
                    dateStart: "2019, Apr",
                    dateEnd: "2019, Aug",
                    date: "", // for mongo retreival,
                    title: "Associate Information Technology Technician",
                    subtitle: "Genworth Canada",
                    details: [
                        "Worked with AngularJS to develop, maintain and produce front-end applications.",
                        "Designed and implemented services, libraries and various components utilizing Angular Clarity and Angular Material framework.",
                        "Created Karma test cases, Keycloak library, Storybook UI components and Docker files.",
                        "Utilized tools such as: Jira, Gitlab and npm.",
                        "Collaborated with Rangle.IO developers in designing and implementing a Genworth application.",
                        "Worked with back-end team to develop new back-end service points using Java and bootstrap."
                    ],
                    hasReference: false // if true, show button, get selected experince on click, pass object _id to populate reference modal
                },
                {
                    type: 0, // 1 for job, 0 for education
                    dateStart: "2018, Jan",
                    date: "", // for mongo retreival,
                    title: "Bachelor's degree of Computer Science",
                    subtitle: "Sheridan College",
                    details: [
                        "Expected graduation 2021, Dec.",
                    ],
                    hasReference: false // if true, show button, get selected experince on click, pass object _id to populate reference modal
                },
                {
                    type: 0, // 1 for job, 0 for education
                    dateStart: "2015, Sep",
                    dateEnd: "2016, Aug",
                    date: "", // for mongo retreival,
                    title: "Certificate of Advanced Programming: Game Development",
                    subtitle: "Sheridan College",
                    details: [
                        "Focused on C++, Unity, OpenGL and creation of tools for the development of games.",
                        "Using Unity engine, created multiple games including android and iOS multiplayer aspects.",
                        "Major capstone involved team of four members to create a fully functional Android game."
                    ],
                    hasReference: false // if true, show button, get selected experince on click, pass object _id to populate reference modal
                },
                {
                    type: 0, // 1 for job, 0 for education
                    dateStart: "2013, Sep",
                    dateEnd: "2015, Apr",
                    date: "", // for mongo retreival,
                    title: "Ontario College Diploma of Computer Programming",
                    subtitle: "Sheridan College",
                    details: [
                        "Studied Java, Javascript, HTML5, and C#.",
                        "Developed a sound understanding of mathematical computing, web development, object oriented programming, Linux, and Unix, UI design, network, SQL, UML, and IT management."
                    ],
                    hasReference: false // if true, show button, get selected experince on click, pass object _id to populate reference modal
                },
                {
                    type: 1, // 1 for job, 0 for education
                    dateStart: "2013, May",
                    dateEnd: "2013, Aug",
                    date: "", // for mongo retreival,
                    title: "Summer Student; Operations Administration",
                    subtitle: "Genworth Canada",
                    details: [
                        "Worked in the underwriting department assisting with general data entry and collation tasks.",
                        "Improved processes, reduced storage use and increased productivity through the creation of Excel scripts."
                    ],
                    hasReference: false // if true, show button, get selected experince on click, pass object _id to populate reference modal
                }
                
            ],
            projects: [
                {
                    title: "Duncan Levings"
                },
                {
                    title: "RSTools"
                },
                {
                    title: "Royaltymine"
                }
            ]
        }
    }

    componentDidMount() {
        if (isMobileOnly) {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        } else {
            if (window.innerHeight < 850) this.setState({ smallScreen: true});
        }
    }

    renderHome = () => {
        const { smallScreen, profile_img, job_title, home_blurb } = this.state;

        if (isMobileOnly) {
            return (
                <Container className="content">
                    <RenderInViewSection hashLocation={RESUME_ROUTES.HASH_HOME} />
                    <Row>
                        <Col xs={12}>
                            <Row>
                                <div className="profileImgContainer mb-4 mx-auto">
                                    <Image className="profileImg" src={profile_img} roundedCircle />
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
                                    {job_title}
                                </span>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            );
        }
        return (
            <Container className="content">
                <RenderInViewSection hashLocation={RESUME_ROUTES.HASH_HOME} />
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
                                {job_title}
                            </span>
                        </Row>
                    </Col>
                    <Col xs={0} md={6}>
                        <div className="profileImgContainer">
                            <Image className="profileImg" src={profile_img} roundedCircle />
                        </div>
                    </Col>
                </Row>
                {smallScreen ? null :
                    <div className="aboutme">
                        <span className="text aboutme-text">
                            {home_blurb}
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
        const { professional } = this.state;

        if (isMobileOnly) {
            return (
                <Container className="content">
                    <RenderInViewSection hashLocation={RESUME_ROUTES.HASH_PROFESSIONAL} />
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
                    {professional.map((item, i) => {
                        return (
                            <div key={i}>
                                <Row>
                                    <Col xs={4} className="pr-1">
                                        <div className="bar-head">
                                            <span className="text body-text">
                                                    {item.skill}
                                            </span>
                                        </div>
                                    </Col>
                                    <Col xs={8}>
                                        <RenderProgBar amount={item.amount} />
                                    </Col>
                                </Row>
                                <div className="spacer-h-2" />
                            </div>
                        );
                    })}
                </Container>
            );
        }
        return (
            <Container className="content">
                <RenderInViewSection hashLocation={RESUME_ROUTES.HASH_PROFESSIONAL} />
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
                {professional.map((item, i) => {
                    return (
                        <div key={i}>
                            <Row>
                                <Col xs={2}>
                                    <div className="bar-head">
                                        <span className="text body-text">
                                                {item.skill}
                                        </span>
                                    </div>
                                </Col>
                                <Col xs={8}>
                                    <RenderProgBar amount={item.amount} />
                                </Col>
                                <Col xs={2}>
                                    <div className="bar-end">
                                        <span className="ml-4 text body-text">
                                            {item.amount}%
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                            <div className="spacer-h-2" />
                        </div>
                    );
                })}
            </Container>
        );
    }

    renderExperience = () => {
        const { experience } = this.state;

        return (
            <div className="experience" id="experience">
                <Container className="content">
                    <RenderInViewSection hashLocation={RESUME_ROUTES.HASH_EXPERIENCE} />
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
                        {experience.map((item, i) => {
                            return (
                                <VerticalTimelineElement
                                    key={i}
                                    dateClassName="timeline-date"
                                    iconClassName="timeline-icon"
                                    textClassName="timeline-container"
                                    date="2020, Jan - present"
                                    date={`${item.dateStart} - ${item.dateEnd ? item.dateEnd : "present"}`}
                                    icon={item.type == 1 ? <FaBriefcase /> : <FaGraduationCap />}
                                    intersectionObserverProps={{ rootMargin: "0px 0px -200px 0px" }}
                                >
                                    <h3 className="vertical-timeline-element-title title">{item.title}</h3>
                                    <h4 className="vertical-timeline-element-subtitle subtitle">{item.subtitle}</h4>
                                    <div className="spacer-h-2" />
                                    <ul>
                                        {item.details.map((detail, i) => {
                                            return (
                                                <li key={i}>{detail}</li>
                                            );
                                        })}
                                    </ul>
                                    <div className="centered-button-container">
                                        {item.hasReference ? (
                                            <Button variant="button-primary" onClick={() => this.setReferenceShow(true)}>Reference Letter</Button>
                                        ) : (null)}
                                    </div>
                                    <div className="spacer-h-2" />
                                </VerticalTimelineElement>
                            );
                        })}
                        <div className="timeline-circle bottom" />
                    </VerticalTimeline>
                    {isMobileOnly ? (null) : (
                        <RenderInViewSection hashLocation={RESUME_ROUTES.HASH_EXPERIENCE} /> // small size of mobile screen would mess with this id if present
                    )}
                </Container>
            </div>
        );
    }

    renderPortfolio = () => {
        // TODO: render latest 3 projects ordered by date started.
        const { projects } = this.state;
        const imgStyle = ["first", "second", "third"];

        if (isMobile) {
            return (
                <div className="portfolio" id="portfolio">
                    <Container className="content">
                        <RenderInViewSection hashLocation={RESUME_ROUTES.HASH_PORTFOLIO} />
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
                            {projects.map((project, i) => {
                                return (
                                    <Row key={i}>
                                        <Col className={`portfolio-image-container ${imgStyle[i]}`}>
                                            <Link to={RESUME_ROUTES.PORTFOLIO} className="portfolio-link">{project.title}</Link>
                                        </Col>
                                    </Row>
                                );
                            })}
                    </Container>
                </div>
            );
        }
        return (
            <div className="portfolio" id="portfolio">
                <Container className="content">
                    <RenderInViewSection hashLocation={RESUME_ROUTES.HASH_PORTFOLIO} />
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
                        {projects.map((project, i) => {
                            return (
                                <Col className={`portfolio-image-container ${imgStyle[i]}`} key={i}>
                                    <Link to={RESUME_ROUTES.PORTFOLIO} className="portfolio-link">{project.title}</Link>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </div>
        );
    }

    renderContact = () => {
        return (
            <Container className="content">
                <div className="contact-head" id="contact" />
                <div className="contact-container">
                    <RenderInViewSection hashLocation={RESUME_ROUTES.HASH_CONTACT} />
                    <Contact />
                </div>
            </Container>
        );
    }

    setReferenceShow = bool => {
        this.setState({ referenceShow: bool });
    }

    render() {
        const { smallScreen, referenceShow, home_blurb } = this.state;
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
                        disabled={isMobileOnly}
                        layers={[
                            {
                                image: "/static_images/tokyo_night_city.jpg",
                                amount: 0.4
                            }
                        ]}
                    >
                        {this.renderHome()}
                    </ParallaxBanner>
                    {isMobileOnly || smallScreen ?
                    <div className="aboutme-mobile">
                        <span className="text aboutme-text">
                            {home_blurb}
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
                        disabled={isMobileOnly}
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
                        disabled={isMobileOnly}
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
