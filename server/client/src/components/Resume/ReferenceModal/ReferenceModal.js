/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ReferenceModal.scss';

class ReferenceModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        // TODO: MODULARIZE AND ALLOW FOR EASY EDITING
    }

    render() {
        const { staticContext, ...rest } = this.props;

        return (
            <Modal
                {...rest}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="ReferenceModal"
                centered
            >
                <Modal.Body>
                    <p>
                        Jack Yan<br />
                        Suite 406<br />
                        Toronto, 263 Adelaide Street West, ON M5H 1Y2<br />
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
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ReferenceModal;
