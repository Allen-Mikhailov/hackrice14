import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css'
import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';

import { Button } from 'react-bootstrap';

import {  } from '../../modules/states';

import { Link, useNavigate } from "react-router-dom";
import { auth, google_auth, signInWithPopup, signOut } from '../../modules/firebase';

async function SignIn(e: React.MouseEvent)
{
  e.preventDefault()
  await signInWithPopup(auth, google_auth);
}

function SignOut(e: React.MouseEvent)
{
  e.preventDefault()
  signOut(auth)
}

function SignedIn()
{
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user);
    })
  }, [])

  //<div style={{display: "flex", justifyContent: "center"}}>

  return (user && <Nav className="me-l" style={{display: "flex", justifyContent: "center", 
  flexDirection: "row", alignItems: "flex-end", alignSelf: "flex-end"}}>
    <Nav.Link as={Link} to="userinfo">{"Hello, "+user.displayName}</Nav.Link>
    <span style={{marginLeft: "25px"}}></span>
    <Button onClick={SignOut} type="submit">Login Out</Button>
    </Nav>)
}

function SignedOut()
{
  return <Button onClick={SignIn} type="submit">Login/Signup</Button>
}

function BaseNavbar() {
  const [user, setUser] = useState<User|null>(null);
  const nav = useNavigate();

  useEffect(() => {
    
    auth.onAuthStateChanged(user => {
      setUser(user);
    })
  }, [])

  function findMatch() {
    nav("/match");
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" 
        data-bs-theme="dark" style={{
          backgroundImage:"linear-gradient(to top, rgba(20,21,21,0), rgba(20,40,100,.3)", 
          backgroundColor:"rgba(0,0,0,0)"
          }} >
      <Container >
        <Navbar.Brand as={Link} to="" style={{ fontWeight: "bold" }}>
          <img src="/motivibes.png" alt="logo" style={{width:40,height:40,marginRight:20}}></img>
          
          Moti-Vibes
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="userinfo">User Profile</Nav.Link>
            <Nav.Link as={Link} to="todo">Todo</Nav.Link>
            <Nav.Link as={Link} to="matches">Matches</Nav.Link>
          </Nav>
          <Button onClick={findMatch} type="submit">Get Match!</Button>
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
