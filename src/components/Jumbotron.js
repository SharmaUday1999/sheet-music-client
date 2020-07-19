import React from 'react';
import { Jumbotron as Jumbo, Button} from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import styled from 'styled-components';
import img from './assets/BaoBass.png';

export const Jumbotron = () => {
    const StyledJumbo = styled(Jumbo)`
      background: url(${img}) no-repeat;
      background-position: center center;
      background-size: cover;
      color: #efefef;
      height: 600px;
    `;

    const StyledH1 = styled.h1`
      font-family: "Open Sans", sans-serif;
      font-weight: 300;
      color: #745A44;
      padding-top: 2vh;
      padding-bottom: 2vh;
      font-size: 40px !important;
      text-align: center;
    `;

    const StyledH3 = styled.h3`
      font-family: 'Dancing Script', cursive;
      font-weight: 300;
      color: #745A44;
      padding-bottom: 2vh;
      font-size: 40px !important;
      text-align: center;
    `;

    const StyledButton = styled(Button)`
      background: #B2967D !important;
      color: #ECF8F8 !important;
      border: 0px solid #ECF8F8 !important;
      padding: 5px 10px !important;
      justify-content: center;
      text-transform: uppercase;

      &:hover {
        background: #ECF8F8 !important;
        color: #B2967D !important;
        border: 0px solid #fff !important;
        padding: 5px 10px !important;
        justify-content: center;
        text-transform: uppercase;
      }
    `;


    return(
      <StyledJumbo>
        <div class = "container text-center">
          <StyledH1>Finding Sheet Music has never been easier</StyledH1>
          <StyledH3>Get started now with Bao Bass</StyledH3>
          <LinkContainer to="/signup">
            <StyledButton>Get Started</StyledButton>
          </LinkContainer>
          
        </div> 
      </StyledJumbo>
    )
}