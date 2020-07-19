import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { FormGroup, FormControl, FormLabel, Container, Row, Card} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import styled from 'styled-components'

export default function Login() {
  const StyledCard = styled(Card)`
      width: 400px;
      background-color: #F9F5F1;
      border: 1px solid #D5B79A;
      box-shadow: 0 1px 3px 0 rgba(63,63,68,0.15);
  `;
  const CardDiv = styled.div`
    padding-top: 60px;
    padding-bottom: 60px;
    padding-right: 30px;
    padding-left: 30px;
  `;
  const StyledTitleDiv = styled.div`
    text-align: center; 
    padding-bottom: 20px;

    &:after {
      content:' ';
      display:block;
      border:1px solid #E6BEAE;
      border-radius:1px;
      -webkit-border-radius:1px;
      -moz-border-radius:1px;
      box-shadow:inset 0 1px 1px rgba(0, 0, 0, .05);
      -webkit-box-shadow:inset 0 1px 1px rgba(0, 0, 0, .05);
      -moz-box-shadow:inset 0 1px 1px rgba(0, 0, 0, .05);
    }
  `;
  const StyledLoginTitle = styled.h4`
    font-family: "Open Sans", sans-serif;
    font-weight: 300;

    
  `;
  const WrapperDiv = styled.div`
    width: 100%;
    padding-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <Container style={{paddingTop:"20px"}}>
      <div className="col d-flex justify-content-center">
    <StyledCard>
      <CardDiv>
        <StyledTitleDiv>
          <StyledLoginTitle>Log in to Bao Bass</StyledLoginTitle>
        </StyledTitleDiv>
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={fields.email}
              onChange={handleFieldChange}
            />
          </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <FormLabel>Password</FormLabel>
              <FormControl
                autoFocus
                type="password"
                value={fields.password}
                onChange={handleFieldChange}
              />
            </FormGroup>
          
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Login
          </LoaderButton>
          <Row>
          <WrapperDiv>
            <p>Sigh up for an account <a href="/signup">here</a></p>
          </WrapperDiv>
          </Row>
        </form>
      </CardDiv>
      </StyledCard>
      </div>
    </Container>
  );
}