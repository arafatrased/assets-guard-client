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
import MyAsset from '../pages/myAsset/MyAsset';
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
          element: <PackagePage></PackagePage>
        },
        {
          path: 'updateasset/:id',
          element: <UpdateAsset></UpdateAsset>,
          loader: ({params}) => fetch(`http://localhost:5000/assets/${params.id}`)
        }

      ]
    },
    {
      path: "admin",
      element: <AdminLayout/>,
      children: [
        {
          index: true,
          element: <Admin></Admin>
        },
        {
          path: 'assetlist',
          element: <AssetList></AssetList>
        },
        {
          path: 'addasset',
          element: <AddAsset></AddAsset>
        },
        {
          path: 'allrequest',
          element: <AllRequest></AllRequest>
        },
        {
          path: 'myemployeelist',
          element: <EmployeeList></EmployeeList>
        },
        {
          path: 'addemployee',
          element: <AddEmployee></AddEmployee>,
          loader: () => fetch('http://localhost:5000/package')
        },
        {
          path: 'myprofile',
          element: <MyProfile></MyProfile>
        }

      ]
    },
    {
      path: 'employee',
      element: <EmployeeLayout></EmployeeLayout>,
      children: [
        {
          index: true,
          element: <Employee></Employee>
        },
        {
          path: 'myasset',
          element: <MyAsset></MyAsset>
        },
        {
          path: 'assetrequest',
          element: <AssetRequestPage></AssetRequestPage>
        },
        {
          path: "myrequestedasset",
          element: <MyRequestedAssets></MyRequestedAssets>
        },
        {
          path: 'myteam',
          element: <MyTeams></MyTeams>
        },
        {
          path: 'myprofile',
          element: <Profile></Profile>
        }


      ]
    }
  ]);

export default router;