import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css'
import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';

import { Form, Row, Col, Button } from 'react-bootstrap';

import {  } from '../../modules/states';

import { Outlet, Link } from "react-router-dom";
import { auth, google_auth, signInWithPopup, signOut } from '../../modules/firebase';



import {
  BrowserRouter, Routes, Route, Router
} from 'react-router-dom';

async function SignIn(e: React.MouseEvent)
{
  e.preventDefault()
  const result = await signInWithPopup(auth, google_auth);
}

function SignOut(e: React.MouseEvent)
{
  e.preventDefault()
  signOut(auth)
}

function SignedIn()
{
  const [user, setUser] = useState<User|null>(null);

  useEffect(() => {
    
    auth.onAuthStateChanged(user => {
      setUser(user);
    })
  }, [])

  return (user && <>
  <Navbar.Text>{"Hello, "+user.displayName}</Navbar.Text>
  <div style={{width: "25px"}}></div>
    <Form>
      <Row>
        <Col xs="auto">
          
          <Button onClick={SignOut} type="submit">Login Out</Button>
        </Col>
        {/* <div style={{width: "50px"}}></div> */}
      </Row>
    </Form>
  </>)
}

function SignedOut()
{
  return <Button onClick={SignIn} type="submit">Login/Signup</Button>
}

function BaseNavbar() {
  const [user, setUser] = useState<User|null>(null);

  useEffect(() => {
    
    auth.onAuthStateChanged(user => {
      setUser(user);
    })
  }, [])

  return (
    <>
      {/* <Navbar bg="dark" data-bs-theme="dark">
          <div style={{width: "50px"}}></div>
          <Navbar.Brand href="/">Moti-Vibes</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="userinfo">User Profile</Nav.Link>
            <Nav.Link as={Link} to="catalog">Find Unmotivated</Nav.Link>
            <Nav.Link as={Link} to="chat">Test chat(will eventually be in chatselect)</Nav.Link>
            <Nav.Link as={Link} to="chatSelect">Chat</Nav.Link>
          </Nav>
          {user?<SignedIn/>:<SignedOut/>}
      </Navbar> */}
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Moti-Vibes</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="userinfo">User Profile</Nav.Link>
            <Nav.Link as={Link} to="catalog">Find Unmotivated</Nav.Link>
            <Nav.Link as={Link} to="chat">Test chat(will eventually be in chatselect)</Nav.Link>
            <Nav.Link as={Link} to="chatSelect">Chat</Nav.Link>
          </Nav>
          {user?<SignedIn/>:<SignedOut/>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
      {/* <br />
      <div id="detail">
        <Outlet />
      </div> */}
    </>
  );
}

export default BaseNavbar
