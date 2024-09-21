import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import Home from './pages/Home/Home.tsx'
import Userinfo from './pages/Userinfo/Userinfo.tsx'
import BaseNavbar from './pages/Navbar/Navbar.tsx'

// Import our custom CSS
import './scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'


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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BaseNavbar></BaseNavbar>
    <RouterProvider router={router} />
  </StrictMode>,
)
