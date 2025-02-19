import React from 'react';
import Navbar from '../shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../shared/Footer/Footer';
import { Toaster } from 'react-hot-toast';

const EmployeeLayout = () => {
    return (
        <div className='dark:bg-black dark:text-white'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Toaster />
            <Footer></Footer>
        </div>
    );
};

export default EmployeeLayout;