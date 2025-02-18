import React from 'react';
import Navbar from '../shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../shared/Footer/Footer';
import { Toaster } from 'react-hot-toast';
import AsideNav from '../pages/Admin2/AsideNav';
import AdminHeader from './../pages/Admin/AdminHeader';

const AdminLayout = () => {
    return (
        <div className="min-h-screen flex bg-gray-100">
            <AsideNav></AsideNav>
            <div className="flex-1 p-2">
                <AdminHeader></AdminHeader>
                <hr className='text-gray-600'/>
                <Outlet></Outlet>
                <Toaster />
            </div>
        </div>
    );
};

export default AdminLayout;