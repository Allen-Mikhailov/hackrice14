import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Home from './pages/Home/Home.tsx'
import Userinfo from './pages/Userinfo/Userinfo.tsx'
import BaseNavbar from './pages/Navbar/Navbar.tsx'

// Import our custom CSS
import './scss/styles.scss'

// Import all of Bootstrap's JS

import { auth } from './modules/firebase.ts'

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
    path: "#userinfo",
    element: <Userinfo/>
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BaseNavbar></BaseNavbar>
    {auth.currentUser != null ? auth.currentUser.displayName : "no user"}
    <RouterProvider router={router} />
  </StrictMode>,
)
