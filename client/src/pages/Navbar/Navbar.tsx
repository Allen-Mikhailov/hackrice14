import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css'
import { useState, useEffect } from 'react';

import { Form, Row, Col, Button } from 'react-bootstrap';

import {  } from '../../modules/states';

import { Outlet, Link } from "react-router-dom";
import { auth, google_auth, signInWithPopup, signOut } from '../../modules/firebase';

async function SignIn(e: any)
{
  e.preventDefault()
  const result = await signInWithPopup(auth, google_auth)
}

function SignOut(e: any)
{
  e.preventDefault()
  signOut(auth)
}

function SignedIn()
{
  const [user, setUser] = useState<any>();

  useEffect(() => {
    
    auth.onAuthStateChanged(user => {
      console.log("user", user)
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
        <div style={{width: "50px"}}></div>
      </Row>
    </Form>
  </>)
}

function SignedOut()
{
  return <Form>
  <Row>
    
    <Col xs="auto">
      <Button onClick={SignIn} type="submit">Login</Button>
    </Col>
    <div style={{width: "50px"}}></div>
  </Row>
</Form>
}

function BaseNavbar() {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    
    auth.onAuthStateChanged(user => {
      console.log("auth state changed", user)
      setUser(user);
    })
  }, [])

  return (
    <>
      <div>
        
      </div>
      <Navbar bg="dark" data-bs-theme="dark">
          <div style={{width: "50px"}}></div>
          <Navbar.Brand href="/">Moti-Vibes</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="userinfo">User Profile</Nav.Link>
            <Nav.Link href="#features">Find Unmotivated</Nav.Link>
            <Nav.Link href="#pricing">Chat</Nav.Link>
            <Nav.Link href="login">Login</Nav.Link>
          </Nav>
          {user?<SignedIn/>:<SignedOut/>}
          
      </Navbar>
      <br />
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default BaseNavbar
