import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Home from './pages/Home/Home.tsx'
import Userinfo from './pages/Userinfo/Userinfo.tsx'

import { app, auth } from './modules/firebase.ts'

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
    {auth.currentUser != null?auth.currentUser.displayName:"no user"}
    <RouterProvider router={router} />
  </StrictMode>,
)
