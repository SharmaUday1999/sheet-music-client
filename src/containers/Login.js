import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { FormGroup, FormControl, FormLabel, Container, Col, Row, Button, Card} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./css/Login.css";

export default function Login() {
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
    <Card className="drop-shadow" style={{width:"400px", paddingTop:"20px"}}>
      <div className="Login" style={{paddingRight:"30px",paddingLeft:"30px"}}>
        <div className = "title"><h4 className = "font-changes">Log in to Bao Bass</h4></div>
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
                type="password"
                value={fields.password}
                onChange={handleFieldChange}
              />
            </FormGroup>
          <div style={{textAlign:"center"}}>
            <Button className="btn2" type="submit">
              Log In
            </Button>
            </div>
          <Row>
          <div className="wrapper" style={{paddingTop:"5px"}}>
            <p>Sigh up for an account <a href="/signup">here</a></p>
          </div>
          </Row>
        </form>
      </div>
      </Card>
      </div>
    </Container>
  );
}