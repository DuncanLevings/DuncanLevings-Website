/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { RSTOOL_ROOT } from 'consts';
import { Image } from 'react-bootstrap';
import './ResumeHome.scss';

class ResumeHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div className="ResumeHome">
                    <div  id="home" className="home">
                        <div className="content">
                            <h1 className="main-header">
                                I'm Duncan Levings.
                            </h1>
                            <h3 className="main-sub-header mt-4">
                                SOFTWARE ENGINEER
                            </h3>
                        </div>
                    </div>
                    <h1>About Me</h1>
                    <p className="small-font">I am a motivated and challenge-seeking person who has been programming since 2010.
                        I thoroughly enjoy all programming aspects and communities. Taking concepts and translating them into tangible,
                        workable applications is what motivates me. It’s exciting to bring ideas to life, and allow people to share in these experiences.
                        <br />
                        <br />
                        Although my interests are diverse, I am particularly interested in web development through Desktop and/or Mobile applications.</p>
                    <h1 id="education">Education</h1>
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
                    <h1 id="projects">Projects</h1>
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
                    <span>Copyright (c) 2020 DuncanLevings <br/> Updated: June 3 2020</span>
                </div>
            </div>
        );
    }
}

export default ResumeHome;
