import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { NavLink, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        console.log('toggleDropdown');
        setIsDropdownOpen(!isDropdownOpen);
    }

    const { data, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            if (!user?.email) return null;
            const res = await axiosPublic.get(`/users?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const handleLogout = async () => {
        try {
            await logOut();
            refetch();
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    useEffect(() => {
        if (!user) handleLogout();
    }, [user]);

    const getLinks = () => {
        if (!data) {
            return [
                { to: '/', label: 'Home' },
                { to: '/joinhrmanager', label: 'Join as HR Manager' },
                { to: '/joinemployee', label: 'Join as Employee' },
                { to: '/login', label: 'Login' },
            ];
        } else if (data.role === 'admin') {
            return [
                { to: '/', label: 'Home' },
                { to: '/assetlist', label: 'Asset List' },
                { to: '/addasset', label: 'Add Asset' },
                { to: '/allrequest', label: 'All Request' },
                { to: '/myemployeelist', label: 'Employee List' },
                { to: '/addemployee', label: 'Add Employee' },
            ];
        } else {
            return [
                { to: '/', label: 'Home' },
                { to: '/myasset', label: 'My Asset' },
                { to: '/myteam', label: 'My Team' },
                { to: '/assetrequest', label: 'Request for Asset' },
                { to: '/myprofile', label: 'Profile' },
            ];
        }
    };

    const links = getLinks();

    return (
        <div className="navbar bg-base-100 font-mono">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content mt-3 z-50 w-52 bg-base-100 p-2 shadow rounded-box"
                    >
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
