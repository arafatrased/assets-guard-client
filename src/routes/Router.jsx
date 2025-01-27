import React from 'react';
import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import JoinHRManager from '../pages/JoinPages/JoinHRManager';
import JoinEmployee from '../pages/JoinPages/JoinEmployee';
import Login from '../pages/Login/Login';
import ErrorPage from '../components/ErrorPage';
import AddAsset from '../pages/AddAsset/AddAsset';
import AssetList from '../pages/AssetList/AssetList';
import EmployeeList from '../pages/EmployeeList/EmployeeList';
import AddEmployee from '../pages/AddEmployee/AddEmployee';
import PackagePage from '../pages/PackagePage/PackagePage';
import UpdateAsset from '../components/UpdateAsset';
import AdminLayout from '../layouts/AdminLayout';
import Admin from '../pages/Admin/Admin';
import EmployeeLayout from '../layouts/EmployeeLayout';
import Employee from '../pages/Employee/Employee';
import AssetRequestPage from '../pages/AssetRequestPage/AssetRequestPage';
import MyRequestedAssets from '../pages/MyRequestedAssets/MyRequestedAssets';
import MyTeams from '../pages/MyTeams/MyTeams';
import Profile from '../pages/Profile/Profile';
import AllRequest from '../pages/AllRequest/AllRequest';
import MyProfile from '../pages/MyProfile/MyProfile';
import PrivateRoute from './PrivateRoute';



const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: '/',
          element: <Home></Home>,
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
        
          
        {
          path: '/packages',
          element: <PrivateRoute><PackagePage></PackagePage></PrivateRoute>,
        },
        {
          path: 'updateasset/:id',
          element: <PrivateRoute><UpdateAsset></UpdateAsset></PrivateRoute>,
          loader: ({params}) => fetch(`http://localhost:5000/assets/${params.id}`)
        }

      ]
    },
    {
      path: "admin",
      element: <AdminLayout></AdminLayout>,
      children: [
        {
          index: true,
          element: <PrivateRoute><Admin></Admin></PrivateRoute>
        },
        {
          path: 'assetlist',
          element: <PrivateRoute><AssetList></AssetList></PrivateRoute>
        },
        {
          path: 'addasset',
          element: <PrivateRoute><AddAsset></AddAsset></PrivateRoute>
        },
        {
          path: 'allrequest',
          element: <PrivateRoute><AllRequest></AllRequest></PrivateRoute>
        },
        {
          path: 'myemployeelist',
          element: <PrivateRoute><EmployeeList></EmployeeList></PrivateRoute>
        },
        {
          path: 'addemployee',
          element: <PrivateRoute><AddEmployee></AddEmployee></PrivateRoute>,
          loader: () => fetch('http://localhost:5000/package')
        },
        {
          path: 'myprofile',
          element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
        }

      ]
    },
    {
      path: 'employee',
      element: <PrivateRoute><EmployeeLayout></EmployeeLayout></PrivateRoute>,  
      children: [
        {
          index: true,
          element: <PrivateRoute><Employee></Employee></PrivateRoute>
        },
        {
          path: 'assetrequest',
          element: <PrivateRoute><AssetRequestPage></AssetRequestPage></PrivateRoute>
        },
        {
          path: "myrequestedasset",
          element: <PrivateRoute><MyRequestedAssets></MyRequestedAssets></PrivateRoute>
        },
        {
          path: 'myteam',
          element: <PrivateRoute><MyTeams></MyTeams></PrivateRoute>
        },
        {
          path: 'myprofile',
          element: <PrivateRoute><Profile></Profile></PrivateRoute>
        }


      ]
    }
  ]);

export default router;