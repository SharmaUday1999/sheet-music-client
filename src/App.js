import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Nav, Navbar, Form, FormControl, Button, Container, NavLink} from "react-bootstrap";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";
import logo from './components/assets/BaoBass_logo.png';
import Footer from './components/Footer';
import styled from 'styled-components';



function App() {
  //styles

  const StyledNavbar = styled(Navbar)`
    margin-bottom:0px;
    background-color: #B2967D;
    min-height: 80px;   
    -webkit-box-shadow: 0 8px 6px -6px #999;
    -moz-box-shadow: 0 8px 6px -6px #999;
    box-shadow: 0 8px 6px -6px #999;
  `;
  const StyledContainerDiv = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  `;
  const ContentWrapDiv = styled.div`
    flex: 1;
  `;
  const StyledNavDiv = styled.div`
    color: #ffffff;
    transition: .2s;

    &:hover {
      color: #E6BEAE;
    }
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


  const history = useHistory();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);    
  
  async function handleLogout() {
    await Auth.signOut();
  
    userHasAuthenticated(false);


    history.push("/login");
  }

  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }
  
    setIsAuthenticating(false);
  }

  return (
    
    !isAuthenticating &&


    <StyledContainerDiv>
    <ContentWrapDiv>
        <StyledNavbar collapseOnSelect>
          <Container>
            <LinkContainer to="/">
              <StyledNavbar.Brand>
              <img
                src={logo}
                height='80'
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
              </StyledNavbar.Brand>
            </LinkContainer>
          <StyledNavbar.Collapse>
            {isAuthenticated
              ? 
              <>
            <Form inline>
              <FormControl type="text" placeholder="Search for a song" className="mr-sm-2" />
              <StyledButton>Search</StyledButton>
            </Form>
            <Nav pullRight className="ml-auto">
              <LinkContainer to="/browse">
                <NavLink><StyledNavDiv>Browse</StyledNavDiv></NavLink>
              </LinkContainer>
                <NavLink onClick={handleLogout}><StyledNavDiv>Logout</StyledNavDiv></NavLink>
            </Nav>
              
              
              
              </>
                
                
              : <>
              <Nav pullRight className="ml-auto">
                <LinkContainer to="/login">
                  <NavLink><StyledNavDiv>Login</StyledNavDiv></NavLink>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <NavLink><StyledNavDiv>
                  Sign Up
                  </StyledNavDiv></NavLink>
                </LinkContainer>
                
              </Nav>
              </>
            }
          </StyledNavbar.Collapse>

          </Container>
        </StyledNavbar>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
          </ContentWrapDiv>
        <Footer/>
      </StyledContainerDiv>
  );
}

export default App;