/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RESUME_ROUTES } from 'consts/Resume_Consts';
import { logoutUser } from 'store/actions/userActions';
import { Container, Form, InputGroup, FormControl, Button, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { Formik } from 'formik';
import { projectSchema } from 'components/helpers/formValidation';
import PropTypes from 'prop-types';
import './AdminProject.scss';
import "react-datepicker/dist/react-datepicker.css";
import { FaPlusSquare } from 'react-icons/fa';

class AdminProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateStart: new Date(),
            dateEnd: new Date(),
            completed: false,
            mainIcons: [
                {
                    _id: "1",
                    text: "React"
                },
                {
                    _id: "2",
                    text: "Angular"
                }
            ],
            languageIcons: [
                {
                    _id: "1",
                    text: "React"
                },
                {
                    _id: "2",
                    text: "Angular"
                },
                {
                    _id: "3",
                    text: "React"
                },
                {
                    _id: "4",
                    text: "Angular"
                }
            ],
            toolIcons: [
                {
                    _id: "1",
                    text: "React"
                },
                {
                    _id: "2",
                    text: "Angular"
                },
                {
                    _id: "3",
                    text: "React"
                },
                {
                    _id: "4",
                    text: "Angular"
                }
            ]
        }
    }

    componentDidMount() {
        console.log(this.props.location.state.type) // 0 for new, 1 for edit

        //fetch icon data
    }

    componentDidUpdate() {
        if (this.props.user) {
            const { isAdmin } = this.props.user;
            if (!isAdmin) this.props.logoutUser(RESUME_ROUTES.HOME);
        }
    }

    submitProject = values => {
        console.log(values)
        console.log(this.state)
    }

    handleDateStartChange = date => {
        this.setState({ dateStart: date });
    }

    handleDateEndChange = date => {
        this.setState({ dateEnd: date });
    }

    clearEndDate = () => {
        this.setState({ dateEnd: null, completed: true });
    }

    render() {
        const { dateStart, dateEnd, completed, mainIcons, languageIcons, toolIcons } = this.state;

        return (
            <div className="AdminProject">
                <Container className="content">
                    <div className="card-errors">
                        {/* {error} */}
                    </div>
                    <Formik
                        validationSchema={projectSchema}
                        onSubmit={this.submitProject}
                        initialValues={{
                            title: '',
                            mainIcon: 'react',
                            context: '',
                            images: [],
                            languages: [],
                            tools: [],
                            details: [],
                            link: '',
                            github: ''
                        }}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            values,
                            touched,
                            errors
                        }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group controlId="formTitle">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Title:</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                name="title"
                                                placeholder="Title of project"
                                                aria-label="Title"
                                                aria-describedby="Title"
                                                value={values.title}
                                                onChange={handleChange}
                                                isInvalid={touched.title && !!errors.title}
                                                autoFocus
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.title}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="formMainIcon">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Main Icon:</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                as="select"
                                                name="mainIcon"
                                                aria-label="MainIcon"
                                                aria-describedby="MainIcon"
                                                value={values.mainIcon}
                                                onChange={handleChange}
                                                isInvalid={touched.mainIcon && !!errors.mainIcon}
                                            >
                                                {mainIcons.map((item, i) => {
                                                    return (
                                                        <option key={i} value={item._id}>{item.text}</option>
                                                    );
                                                })}
                                            </FormControl>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.mainIcon}
                                            </Form.Control.Feedback>
                                            <InputGroup.Append>
                                                <Button variant="button-secondary"><FaPlusSquare className="add-icon" /></Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="formContext">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Context:</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                name="context"
                                                placeholder="Briefly describe project"
                                                aria-label="Context"
                                                aria-describedby="Context"
                                                value={values.context}
                                                onChange={handleChange}
                                                isInvalid={touched.context && !!errors.context}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.context}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="formDate">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Dates:</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Col className="date-col">
                                            <DatePicker
                                                showPopperArrow={false}
                                                selected={dateStart}
                                                onChange={this.handleDateStartChange}
                                                className="custom-date"
                                            />
                                            </Col>
                                            {completed ? (null) : (
                                                <Col className="date-col">
                                                    <DatePicker
                                                        showPopperArrow={false}
                                                        selected={dateEnd}
                                                        onChange={this.handleDateEndChange}
                                                        className="custom-date"
                                                    />
                                                </Col>
                                            )}
                                            <InputGroup.Append>
                                                <Button variant="button-secondary" onClick={() => this.clearEndDate()} disabled={completed}>In Progress</Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="formImages">
                                        <h3>IMAGE UPLOAD/CPOP</h3>
                                    </Form.Group>
                                    <Form.Group controlId="formLanguages">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Languages:</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                as="select"
                                                multiple
                                                name="languages"
                                                aria-label="Languages"
                                                aria-describedby="Languages"
                                                value={values.languages}
                                                onChange={handleChange}
                                                isInvalid={touched.languages && !!errors.languages}
                                            >
                                                {languageIcons.map((item, i) => {
                                                    return (
                                                        <option key={i} value={item._id}>{item.text}</option>
                                                    );
                                                })}
                                            </FormControl>
                                            <InputGroup.Append>
                                                <Button variant="button-secondary"><FaPlusSquare className="add-icon" /></Button>
                                            </InputGroup.Append>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.languages}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="formTools">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Tools:</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                as="select"
                                                multiple
                                                name="tools"
                                                aria-label="Tools"
                                                aria-describedby="Tools"
                                                value={values.tools}
                                                onChange={handleChange}
                                                isInvalid={touched.tools && !!errors.tools}
                                            >
                                                {toolIcons.map((item, i) => {
                                                    return (
                                                        <option key={i} value={item._id}>{item.text}</option>
                                                    );
                                                })}
                                            </FormControl>
                                            <InputGroup.Append>
                                                <Button variant="button-secondary"><FaPlusSquare className="add-icon" /></Button>
                                            </InputGroup.Append>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.tools}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="formDetails">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Details:</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                as="textarea"
                                                rows="5"
                                                name="details"
                                                placeholder="Detailed description of project - seperate sentences by space or new line"
                                                aria-label="Details"
                                                aria-describedby="Details"
                                                value={values.details}
                                                onChange={handleChange}
                                                isInvalid={touched.details && !!errors.details}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.details}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="formLink">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Link:</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                name="link"
                                                placeholder="Link to website if any"
                                                aria-label="Link"
                                                aria-describedby="Link"
                                                value={values.link}
                                                onChange={handleChange}
                                                isInvalid={touched.link && !!errors.link}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.link}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="formGithub">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Github:</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                name="github"
                                                placeholder="Link to github repo"
                                                aria-label="Github"
                                                aria-describedby="Github"
                                                value={values.github}
                                                onChange={handleChange}
                                                isInvalid={touched.github && !!errors.github}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.github}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <div className="project-submit">
                                        <Button
                                            variant="button-primary"
                                            type="submit"
                                            disabled={false}>Submit</Button>
                                    </div>
                                </Form>
                            )}
                    </Formik>
                </Container>
            </div>
        );
    }
}

AdminProject.propTypes = {
    logoutUser: PropTypes.func,
    user: PropTypes.object
};

const mapStateToProps = state => {
    return {
        user: state.userReducer.user
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ logoutUser }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminProject));

