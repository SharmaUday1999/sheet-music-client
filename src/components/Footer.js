import React from 'react';
import './css/Footer.css';
import { Container , Row, Col} from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

const Footer = () => {
    return(
        <div className = "main-footer">
            <Container>
                <Row style={{paddingTop:'10px', paddingBottom:'10px'}}>
                    <Col>
                        <h2 className="font-changes">Bao Bass</h2>
                    </Col>
                    <Col>
                        <h5 className="font-changes">Navigation</h5>
                        <ul className = "list-unstyled" style={{fontFamily:"Open Sans, sans-serif", fontWeight:"300"}}>
                            <LinkContainer to="/">
                                <a className="link"><li>Home</li></a>
                            </LinkContainer>
                            <LinkContainer  to="/">
                                <a className="link"><li>Pricing</li></a>
                            </LinkContainer>
                            <LinkContainer to="/">
                                <a className="link"><li>About</li></a>
                            </LinkContainer>
                        </ul>
                    </Col>
                    <Col>
                        <h5 className="font-changes">More</h5>                
                        <ul className = "list-unstyled" style={{fontFamily:"Open Sans, sans-serif", fontWeight:"300"}}>        
                             <LinkContainer to="/">
                                <a className="link"><li>Terms and conditions</li></a>
                            </LinkContainer>
                            <LinkContainer  to="/">
                                <a className="link"><li>Privacy Policy</li></a>
                            </LinkContainer>
                        </ul>
                    </Col>
                </Row>
            </Container>
                    <div style={{textAlign:"center", backgroundColor:"#5A4635", paddingTop:'5px', paddingBottom:'5px', fontWeight: '100'}}>©Bao Bass Inc. All rights reserved.</div>
        </div>
    )
}
export default Footer;