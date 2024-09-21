import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GoogleAuthProvider } from 'firebase/auth/web-extension'

import Home from './pages/Home/Home.tsx'
import Userinfo from './pages/Userinfo/Userinfo.tsx'
import BaseNavbar from './pages/Navbar/Navbar.tsx'

import { user_state } from './modules/states.ts'

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
  },
  {
    path: "/Userinfo",
    element: <Userinfo/>
  },
]);

function App()
{
  const [user, setUser] = user_state.useState();

  useEffect(() => {
    
    auth.onAuthStateChanged(user => {
      setUser(user);
    })
  }, [])

  return <div>

  </div>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BaseNavbar></BaseNavbar>
    <RouterProvider router={router} />
  </StrictMode>,
)
