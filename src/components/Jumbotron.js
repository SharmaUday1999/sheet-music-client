import React from 'react';
import { Jumbotron as Jumbo} from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import './css/Jumbotron.css'

export const Jumbotron = () => (
    <Jumbo fluid className="jumbo">
      <div className="overlay"></div>
      <Container>
        <h1 class = 'sans-font'>Sheet music Project</h1>
        <p>Sheet music, made easy</p>
      </Container>
    </Jumbo>
)