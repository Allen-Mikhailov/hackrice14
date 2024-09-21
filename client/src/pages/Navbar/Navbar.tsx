import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css'

import { Outlet, Link } from "react-router-dom";


function BaseNavbar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Moti-Vibes</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#userinfo">User Profile</Nav.Link>
            <li> 
              <Link to={'userinfo'}>User Profile</Link>
            </li>  
            <Nav.Link href="#features">Find Unmotivated</Nav.Link>
            <Nav.Link href="#pricing">Chat</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default BaseNavbar
