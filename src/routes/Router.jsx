import React from 'react';
import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import Products from '../components/Products';
import JoinHRManager from '../pages/JoinPages/JoinHRManager';
import JoinEmployee from '../pages/JoinPages/JoinEmployee';
import Login from '../pages/Login/Login';



const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <h1>404</h1>,
      children: [
        {
          path: '/',
          element: <Home></Home>,
        },
        {
          path: 'products',
          element: <Products></Products>
        },
        {
          path: 'joinhrmanager',
          element: <JoinHRManager></JoinHRManager>
        },
        {
          path: 'joinemployee',
          element: <JoinEmployee></JoinEmployee>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        
        

      ]
    },
  ]);

export default router;