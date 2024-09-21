import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css'
import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';

import { Form, Row, Col, Button } from 'react-bootstrap';

import {  } from '../../modules/states';

import { Outlet, Link } from "react-router-dom";
import { auth, google_auth, signInWithPopup, signOut } from '../../modules/firebase';

import Home from '../Home/Home'
import Userinfo from '../Userinfo/Userinfo'
import Catalog from '../Catalog/Catalog'
import Chat from '../Chat/Chat'
import ChatSelect from '../ChatSelect/ChatSelect'



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
      <Button onClick={SignIn} type="submit">Login/Signup</Button>
    </Col>
    <div style={{width: "50px"}}></div>
  </Row>
</Form>
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
      <div>
      
      </div>
      <BrowserRouter>
      <Navbar bg="dark" data-bs-theme="dark">
          <div style={{width: "50px"}}></div>
          <Navbar.Brand href="/">Moti-Vibes</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="userinfo">User Profile</Nav.Link>
            <Nav.Link as={Link} to="catalog">Find Unmotivated</Nav.Link>
            <Nav.Link as={Link} to="chat">Test chat(will eventually be in chatselect)</Nav.Link>
            <Nav.Link as={Link} to="chatSelect">Chat</Nav.Link>
          </Nav>
          {user?<SignedIn/>:<SignedOut/>}
          
      </Navbar>
      <div style={{padding: 50}}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/userinfo" element={<Userinfo/>} />
          <Route path="/catalog" element={<Catalog/>} />
          <Route path="/chat" element={<Chat/>} />
          <Route path="/chatSelect" element={<ChatSelect/>} />
        </Routes>
      </div>
      </BrowserRouter>
      <br />
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default BaseNavbar
