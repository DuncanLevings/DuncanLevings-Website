/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col } from 'react-bootstrap';
import { updateActiveHash } from 'store/actions/navbarActions';
import { RESUME_ROUTES } from 'consts/Resume_Consts';
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
            ]
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.updateActiveHash(RESUME_ROUTES.HASH_PORTFOLIO);
    }

    render() {
        return (
            <div className="Portfolio">
                <Container className="content">
                    <Row className="justify-content-center">
                        {this.state.languages.map((language, i) => {
                            return (
                                <Col key={i} xs={3} xl={"auto"}>
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
                    <div className="d-none d-xl-block spacer-h-4" />
                    <hr className="portfolio-divider"/>
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
