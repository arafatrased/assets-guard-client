import React from 'react';
import Navbar from '../shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../shared/Footer/Footer';
import { Toaster } from 'react-hot-toast';

const AdminLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet></Outlet>
            <Toaster />
            <Footer></Footer>
        </div>
    );
};

export default AdminLayout;