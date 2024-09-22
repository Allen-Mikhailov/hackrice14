import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BaseNavbar from './pages/Navbar/Navbar.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import BackEndConnection from './BackEndConnection.tsx'

import Home from './pages/Home/Home.tsx'
import Userinfo from './pages/Userinfo/Userinfo'
import Todo from './pages/Todo/Todo.tsx'
import Chat from './pages/Chat/Chat'
import ChatSelect from './pages/ChatSelect/ChatSelect'
import Match from './pages/Match/Match'

// Import our custom CSS
import './scss/styles.scss'

import githublogo from "./assets/githublogo.svg"

function Footer()
{
  return <div className='footer'>
    Created by Allen Mikhailov, Justin Lopato, Kevin Bao, and Clay Goldsmith for HackRice 14.
    <a href="https://github.com/Allen-Mikhailov/hackrice14">
      <img src={githublogo} alt="github logo" style={{
        width:30,
        height:30,
        margin:25,
        filter: "invert(100%)"
      }}></img>
    </a> 
  </div>
}

function App()
{
  return <>
    <BrowserRouter>
      <BackEndConnection/>
      <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
      <BaseNavbar></BaseNavbar>
      <div className='page-container' style={{flex: 1}}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/userinfo" element={<Userinfo/>} />
          <Route path="/todo" element={<Todo/>} />
          <Route path="/chat/:id" element={<Chat/>} />
          <Route path="/matches" element={<ChatSelect/>} />
          <Route path="/match" element={<Match/>} />
        </Routes>
        
      </div>
      <Footer/>
      </div>
    </BrowserRouter>
  </>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
