import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css'

import { auth, google_auth, signInWithPopup } from '../../modules/firebase';

function SignInButton()
{
  async function onclick()
  {
    const result = await signInWithPopup(auth, google_auth)
  }
  return <div onClick={onclick}>Sign In</div>
}
import { Outlet, Link } from "react-router-dom";


function BaseNavbar() {
  return (
    <>
      <div>
        
      </div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Moti-Vibes</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="userinfo">User Profile</Nav.Link>
            <Nav.Link href="#features">Find Unmotivated</Nav.Link>
            <Nav.Link href="#pricing">Chat</Nav.Link>
            <Nav.Link href="login">Login</Nav.Link>
          </Nav>
          <h1>Username</h1>
        </Container>
      </Navbar>
      <br />
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default BaseNavbar
