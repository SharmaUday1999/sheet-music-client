import React from 'react';
import { Container , Row, Col} from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import styled from 'styled-components';

const Footer = () => {
    const StyledRow = styled(Row)`
        padding-top: 10px;
        padding-bottom: 10px;
    `;
    const StyledHeader2 = styled.h2`
        font-weight: 300;
    `;
    const StyledHeader5 = styled.h5`
        font-weight: 300;
    `;
    const StyledLink = styled.a`
        color: white;

        &:hover {
            color: white;
        }
    `;
    const StyledFootedDiv = styled.div`
        position: relative;
        bottom: 0;
        width: 100;
        background-color: #745A44;
        color: #fff;
        padding-top: 5px;
        border-top: 1px solid #D5B79A;
    `;

    return(
        <StyledFootedDiv>
            <Container>
                <StyledRow>
                    <Col>
                        <StyledHeader2>Bao Bass</StyledHeader2>
                    </Col>
                    <Col>
                        <StyledHeader5>Navigation</StyledHeader5>
                        <ul className = "list-unstyled" style={{fontFamily:"Open Sans, sans-serif", fontWeight:"300"}}>
                            <LinkContainer to="/">
                                <StyledLink><li>Home</li></StyledLink>
                            </LinkContainer>
                            <LinkContainer  to="/">
                                <StyledLink><li>Pricing</li></StyledLink>
                            </LinkContainer>
                            <LinkContainer to="/">
                                <StyledLink><li>About</li></StyledLink>
                            </LinkContainer>
                        </ul>
                    </Col>
                    <Col>
                        <StyledHeader5>More</StyledHeader5>                
                        <ul className = "list-unstyled" style={{fontFamily:"Open Sans, sans-serif", fontWeight:"300"}}>        
                             <LinkContainer to="/">
                                <StyledLink><li>Terms and conditions</li></StyledLink>
                            </LinkContainer>
                            <LinkContainer  to="/">
                                <StyledLink><li>Privacy Policy</li></StyledLink>
                            </LinkContainer>
                        </ul>
                    </Col>
                </StyledRow>
            </Container>
                    <div style={{textAlign:"center", backgroundColor:"#5A4635", paddingTop:'5px', paddingBottom:'5px', fontWeight: '100'}}>©Bao Bass Inc. All rights reserved.</div>
        </StyledFootedDiv>
    )
}
export default Footer;