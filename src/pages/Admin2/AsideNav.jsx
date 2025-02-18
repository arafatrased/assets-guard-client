import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineAddHomeWork } from "react-icons/md";
import { GoGitPullRequest, GoPeople } from "react-icons/go";
import { IoPersonAddOutline } from "react-icons/io5";
import { RxUpdate } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const AsideNav = () => {
  const { user, logOut } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosPublic.get(`/users?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

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
    <aside className="w-64 hidden md:inline-block font-mono bg-white shadow-md">
      <div className='border-b-2 py-6 p-4'>
        {
          data?.companyName ? <div className='p-1 border-r-2 border-b-2 border-r-orange-400 border-b-slate-400'><Link className="text-xl uppercase">{<img className='w-full h-24 object-cover' src={data?.companyLogo} />}</Link></div> : <div className='p-1 border-r-2 border-b-2 border-r-orange-400 border-b-slate-400'><Link className="text-xl uppercase">Asset Guard</Link></div>
        }
      </div>
      <nav className='p-4'>
        <ul className="space-y-3 flex flex-col">

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
      </nav>
    </aside>
  );
};

export default AsideNav;