import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Nav, Navbar, NavItem} from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";



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
      <div className="App">
        <Navbar bg="light" fluid collapseOnSelect className = "navbar">
          <div className = "container">
            <Navbar.Brand href= "/">
              Sheet Music Project
            </Navbar.Brand>
          <Navbar.Collapse>
            <Nav pullRight className="ml-auto">
            {isAuthenticated
              ? 
              <>
              <LinkContainer to="/browse">
                <Nav.Link>Browse</Nav.Link>
              </LinkContainer>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              
              
              
              </>
                
                
              : <>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </>
            }
            </Nav>
          </Navbar.Collapse>

      </div>
        </Navbar>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
      </div>
  );
}

export default App;