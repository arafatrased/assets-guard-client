import React from 'react';
import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import Products from '../components/Products';

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
          path: '/products',
          element: <Products></Products>
        }
      ]
    },
  ]);

export default router;