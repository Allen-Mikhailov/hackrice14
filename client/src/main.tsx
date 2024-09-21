import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Home from './pages/Home/Home.tsx'
import Userinfo from './pages/Userinfo/Userinfo.tsx'
import BaseNavbar from './pages/Navbar/Navbar.tsx'

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
    path: "Userinfo",
    element: <Userinfo/>
  },
]);

function SignInButton()
{
  function onclick()
  {
    signInWithPopup(auth, google_auth)
  }
  return <div onClick={onclick}>Sign In</div>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BaseNavbar></BaseNavbar>
    {auth.currentUser != null?auth.currentUser.displayName:<SignInButton/>}
    <RouterProvider router={router} />
  </StrictMode>,
)
