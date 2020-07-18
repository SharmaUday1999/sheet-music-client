import React from 'react';
import { Jumbotron as Jumbo, Button, Container, Col} from 'react-bootstrap';
import './css/Jumbotron.css';
import { LinkContainer } from "react-router-bootstrap";

export const Jumbotron = () => (
    <Jumbo fluid className="jumbo">
      <div class = "container text-center">
        <h1 class="text">Finding Sheet Music has never been easier</h1>
        <h3 class="text-child">Get started now with Bao Bass</h3>
        <LinkContainer to="/signup">
          <Button className="custom-btn" >Get Started</Button>
        </LinkContainer>
        
      </div> 
    </Jumbo>
)