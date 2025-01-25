import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { Link, NavLink, useNavigate } from 'react-router-dom';
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
    console.log(data);
    useEffect(() => {
        if (!user) handleLogout();
    }, [user]);

    const getLinks = () => {
        if (!data) {
            return [
                { to: '/', label: 'Home' },
                { to: '/joinhrmanager', label: 'Join as HR Manager' },
                { to: '/joinemployee', label: 'Join as Employee' },
                // { to: '/login', label: 'Login' },
            ];
        } else if (data.role === 'admin') {
            return [
                { to: '/admin', label: 'Home' },
                { to: '/admin/assetlist', label: 'Asset List' },
                { to: '/admin/addasset', label: 'Add Asset' },
                { to: '/admin/allrequest', label: 'All Request' },
                { to: '/admin/myemployeelist', label: 'Employee List' },
                { to: '/admin/addemployee', label: 'Add Employee' },
                { to: '/admin/myprofile', label: 'Profile' }
            ];
        } else {
            return [
                { to: '/employee', label: 'Home' },
                { to: '/employee/myrequestedasset', label: 'My Asset' },
                { to: '/employee/myteam', label: 'My Team' },
                { to: '/employee/assetrequest', label: 'Request for Asset' },
                { to: '/employee/myprofile', label: 'Profile' },
            ];
        }
    };

    const links = getLinks();

    return (
        <div>
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

                    {
                        data?.companyName ? <div className='p-1 border-r-2 border-b-2 border-r-orange-400 border-b-slate-400'><Link className="text-xl uppercase">{data?.companyLogo || data?.companyName}</Link></div> : <div className='p-1 border-r-2 border-b-2 border-r-orange-400 border-b-slate-400'><Link className="text-xl uppercase">Asset Guard</Link></div>
                    }
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
                        <>
                            <div>
                                <img className='w-8 h-8 rounded-full mr-2' src={data?.photoURL} alt="" />
                            </div>
                            <button onClick={handleLogout} className="btn btn-sm btn-outline">
                                Logout
                            </button></>

                    ) : (
                        <NavLink to="/login" className="btn btn-sm btn-outline">
                            Login
                        </NavLink>
                    )}
                </div>
            </div>
            <hr />
        </div>
    );
};

export default Navbar;
