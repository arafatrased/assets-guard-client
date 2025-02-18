import React, { useEffect } from 'react';
import useAuth from './../../hooks/useAuth';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineAddHomeWork } from "react-icons/md";
import { GoGitPullRequest, GoPeople } from "react-icons/go";
import { IoPersonAddOutline } from "react-icons/io5";
import { RxUpdate } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";


const AdminHeader = () => {

  const { user } = useAuth();

    const handleLogOut = async () => {
      try {
        await logOut();
        navigate('/');
      } catch (error) {
        toast.error('Logout failed:');
      }
    };
    useEffect(() => {
      if (!user) handleLogOut();
    }, [user]);
  return (
    <div className='w-full bg-orange-50'>
      <header className="flex font-mono justify-between items-center md:w-11/12 mx-auto py-4">
        <div className='md:hidden'>
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
              <NavLink className={({ isActive }) =>
                isActive
                  ? 'flex text-orange-700 hover:font-semibold items-center gap-2 py-2 pr-4'
                  : 'flex items-center gap-2 py-2'
              } to="/admin/addasset"><MdOutlineAddHomeWork />Add Asset</NavLink>
              <NavLink className={({ isActive }) =>
                isActive
                  ? 'flex text-orange-700 hover:font-semibold items-center gap-2 py-2 pr-4'
                  : 'flex items-center gap-2 py-2'
              } to="/admin/allrequest"><GoGitPullRequest />All Request</NavLink>
              <NavLink className={({ isActive }) =>
                isActive
                  ? 'flex text-orange-700 hover:font-semibold items-center gap-2 py-2 pr-4'
                  : 'flex items-center gap-2 py-2'
              } to="/admin/myemployeelist"><GoPeople />My Employee</NavLink>
              <NavLink className={({ isActive }) =>
                isActive
                  ? 'flex text-orange-700 hover:font-semibold items-center gap-2 py-2 pr-4'
                  : 'flex items-center gap-2 py-2'
              } to="/admin/addemployee"><IoPersonAddOutline />Add Employee</NavLink>
              <NavLink className={({ isActive }) =>
                isActive
                  ? 'flex text-orange-700 hover:font-semibold items-center gap-2 py-2 pr-4'
                  : 'flex items-center gap-2 py-2'
              } to="/admin/myprofile"><RxUpdate />Update Profile</NavLink>

              <NavLink
                onClick={handleLogOut}
                className={({ isActive }) =>
                  isActive
                    ? 'flex text-orange-700 hover:font-semibold items-center gap-2 py-2 pr-4'
                    : 'flex items-center gap-2 py-2'
                }><IoIosLogOut />Log Out</NavLink>
            </ul>
          </div>
        </div>
        <Link className="text-md md:text-xl lg:2xl font-bold">HR MANAGER DASHBOARD</Link>
        <div className="flex items-center space-x-4">
          <span>🔔</span>
          <div className="flex items-center space-x-2">
            <span className="font-medium text-sm md:text-md">{user?.displayName}</span>
            <img src={user?.photoURL} alt="Profile" className="rounded-full ring-2 ring-orange-200 p-1 w-10 h-10" />
          </div>
        </div>

      </header>
    </div>
  );
};

export default AdminHeader;