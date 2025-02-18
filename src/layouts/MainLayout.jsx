import React from 'react';
import Footer from '../shared/Footer/Footer';

import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from '../shared/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div className='dark:bg-black dark:text-white'>
            <Navbar></Navbar>
             <Outlet></Outlet>
             <Toaster />
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;