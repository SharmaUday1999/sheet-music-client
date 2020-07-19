import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  FormText,
  FormGroup,
  FormControl,
  FormLabel,
  Tooltip, 
  OverlayTrigger,
  Card,
  Row,
  Container,
  Col
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import { Auth } from "aws-amplify";
import styled from "styled-components";

export default function Signup() {

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



  const [fields, handleFieldChange] = useFormFields({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);



  const tooltip = (
    <Tooltip id="tooltip">
      Password must have atleast 8 characters
    </Tooltip>
  );

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password,
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
  
  async function handleConfirmationSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);
  
      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
  function renderConfirmationForm() {
    return (
      <Container style={{paddingTop:"20px"}}>
        <Row>
          <Col></Col>
          <Col>
    <StyledCard>
      <CardDiv>
      <form onSubmit={handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <FormLabel style={{paddingTop:"30px"}}>Confirmation Code</FormLabel>
          <FormControl
            autoFocus
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
          />
          <FormText>Please check your email for the code.</FormText>
        </FormGroup>
        <div style={{paddingBottom:"30px"}}>
          <div style={{textAlign:"center"}}>
          <LoaderButton
            autoFocus
              block
              type="submit"
              bsSize="large"
              isLoading={isLoading}
              disabled={!validateForm()}
            >
              Signup
            </LoaderButton>
            </div>
        </div>
      </form></CardDiv></StyledCard></Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }

  function renderForm() {
    return (

      <Container style={{paddingTop:"20px"}}>
      <div className="col d-flex justify-content-center">
      <StyledCard> 
      <CardDiv>
        <StyledTitleDiv><StyledLoginTitle>Sign up for Bao Bass</StyledLoginTitle></StyledTitleDiv>
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
        <OverlayTrigger placement="left" overlay={tooltip}>
          <FormGroup controlId="password" bsSize="large">
          Password          <FormControl
          autoFocus
              type="password"
              value={fields.password}
              onChange={handleFieldChange}
            />
          </FormGroup>
        </OverlayTrigger>
          <FormGroup controlId="confirmPassword" bsSize="large">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
            autoFocus
              type="password"
              onChange={handleFieldChange}
              value={fields.confirmPassword}
            />
          </FormGroup>
            <LoaderButton
              autoFocus
              block
              type="submit"
              bsSize="large"
              isLoading={isLoading}
              disabled={!validateConfirmationForm()}
            >
              Signup
            </LoaderButton>
        </form>
        </CardDiv>
      </StyledCard></div>
    </Container>
    );
  }

  return (<>
      {newUser === null ? renderForm() : renderConfirmationForm()}</>
  );
}