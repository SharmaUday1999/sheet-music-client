import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Nav, Navbar, Form, FormControl, Button} from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";
import logo from './components/assets/BaoBass_logo.png';
import Footer from './components/Footer';



function App() {

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


    <div className="page-container">
    <div className="content-wrap">
      <div className="App">
        <Navbar collapseOnSelect className = "navbar">
          <div className = "container">
            <LinkContainer to="/">
              <Navbar.Brand>
              <img
                src={logo}
                height='80'
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
              </Navbar.Brand>
            </LinkContainer>
          <Navbar.Collapse>
            {isAuthenticated
              ? 
              <>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-info" className="custom-search-button">Search</Button>
            </Form>
            <Nav pullRight className="ml-auto">
              <LinkContainer to="/browse">
                <Nav.Link className="text-color-navlinks">Browse</Nav.Link>
              </LinkContainer>
                <Nav.Link onClick={handleLogout} className="text-color-navlinks">Logout</Nav.Link>
            </Nav>
              
              
              
              </>
                
                
              : <>
              <Nav pullRight className="ml-auto">
                <LinkContainer to="/login">
                  <Nav.Link className="text-color-navlinks">Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link className="text-color-navlinks">
                  Sign Up
                  </Nav.Link>
                </LinkContainer>
                
              </Nav>
              </>
            }
          </Navbar.Collapse>

      </div>
        </Navbar>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
              </div>
            </div>
        <Footer></Footer>
      </div>
  );
}

export default App;