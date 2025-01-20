import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { NavLink, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext); // Assuming `logout` is a function provided by your AuthProvider
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()

    // Fetch user role from API
    const { data, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            if (!user?.email) return null;
            const res = await axiosPublic.get(`/users?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // Handle logout when user does not exist
    const handleLogout = async () => {
        try {
            await logOut();
            refetch();
            navigate('/')
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    useEffect(() => {
        if (!user) {
            handleLogout();
        }
    }, [user]); // Run effect when user changes

    useEffect(()=>{
        refetch();
    }, [user?.email])

    // Generate navigation links dynamically
    const getLinks = () => {
        if (!data) {
            // User not logged in
            return [
                { to: '/', label: 'Home' },
                { to: '/joinhrmanager', label: 'Join as HR Manager' },
                { to: '/joinemployee', label: 'Join as Employee' },
                { to: '/login', label: 'Login' },
            ];
        } else if (data.role === 'admin') {
            // Admin links
            return [
                { to: '/', label: 'Home' },
                { label: 'Asset List', to: '/assetlist' },
                { label: 'Add Asset', to: '/addasset' },
                { label: 'All Request', to: '/allrequest' },
                { label: 'Employee List', to: '/myemployeelist' },
                { label: 'Add Employee', to: '/addemployee' },
            ];
        } else if (data.role === 'employee') {
            // Employee links
            return [
                { to: '/', label: 'Home' },
                { label: 'My Asset', to: '/myasset' },
                { label: 'My Team', to: '/myteam' },
                { label: 'Request for Asset', to: '/assetrequest' },
                { label: 'Profile', to: '/myprofile' },
            ];
        }
    };

    const links = getLinks();

    return (
        <div className="navbar bg-base-100 font-mono">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">Asset Guard</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links.map(({ to, label }, idx) => (
                        <li key={idx}>
                            <NavLink
                                to={to}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'flex text-orange-700 hover:font-semibold items-center gap-2 py-2 pr-4'
                                        : 'flex items-center gap-2 py-2'
                                }
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="navbar-end">
                {data ? (
                    <button onClick={handleLogout} className="btn">
                        Logout
                    </button>
                ) : (
                    <a className="btn">User</a>
                )}
            </div>
        </div>
    );
};

export default Navbar;
