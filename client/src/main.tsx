import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import BaseNavbar from './pages/Navbar/Navbar.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import BackEndConnection from './BackEndConnection.tsx'

import Home from './pages/Home/Home.tsx'
import Userinfo from './pages/Userinfo/Userinfo'
import Catalog from './pages/Catalog/Catalog'
import Chat from './pages/Chat/Chat'
import ChatSelect from './pages/ChatSelect/ChatSelect'

// Import our custom CSS
import './scss/styles.scss'
import { getChat } from './modules/backend_functions.ts'

function App()
{
  return <>
    <BrowserRouter>
      <BackEndConnection/>
      <BaseNavbar></BaseNavbar>
      <div style={{padding: 50}}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/userinfo" element={<Userinfo/>} />
          <Route path="/catalog" element={<Catalog/>} />
          <Route path="/chat" element={<Chat/>} />
          <Route path="/chat/:id" loader={({ params }) => getChat(params.id)} element={<Chat/>} />
          <Route path="/chatSelect" element={<ChatSelect/>} />
        </Routes>
      </div>
    </BrowserRouter>
  </>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
