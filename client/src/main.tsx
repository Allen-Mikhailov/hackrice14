import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GoogleAuthProvider } from 'firebase/auth/web-extension'

import Home from './pages/Home/Home.tsx'
import Userinfo from './pages/Userinfo/Userinfo.tsx'
import BaseNavbar from './pages/Navbar/Navbar.tsx'

import { user_state } from './modules/states.ts'

import Login from './pages/Login/Login.tsx'
// Import our custom CSS
import './scss/styles.scss'

// Import all of Bootstrap's JS

import { auth, google_auth, signInWithPopup } from './modules/firebase.ts'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    children: [
      {
        path: "users",
        element: <Userinfo />
      },
    ]
  },
  {
    path: "/Userinfo",
    element: <Userinfo/>
  },
  {
    path:"login",
    element:<Login/>,
  },
]);

function App()
{
  return <>
    <BaseNavbar></BaseNavbar>
    
  </>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
