import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyProfile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate();
    const { data: userDetail, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            if (!user?.email) return null;
            const res = await axiosPublic.get(`/users?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const displayName = form.name.value;
        const photoURL = form.photoURL.value;
        updateUserProfile(displayName, user?.email)
            .then(() => {
                const userInfo = {
                    email: user?.email,
                    displayName,
                    photoURL    
                }
                axiosPublic.patch('/users-profile', userInfo)
                    .then(res => {
                        navigate('/admin');
                        refetch();
                    })
                toast.success('Profile updated successfully');
            })
            .catch((error) => {
                toast.error('Failed to update profile');
            });
    }
    return (
        <div className='min-h-screen font-mono w-11/12 md:w-9/12 mx-auto p-5'>
            <Helmet>
                <title>Admin | Update Profile</title>
            </Helmet>
            <h2 className='my-8 font-mono font-bold uppercase text-center'>Update Your Profile</h2>

            <form onSubmit={handleProfileUpdate} className='flex flex-col gap-4 items-center'>
                <div className="w-[80%]">
                    <label htmlFor="name" className="text-[15px] font-[400]">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                        required
                    />
                </div>
                <div className="w-[80%]">
                    <label htmlFor="name" className="text-[15px] font-[400]">
                        photoURL <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="photoURL"
                        placeholder="Your name"
                        className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                        required
                    />
                </div>
                <button type="submit" className='btn btn-outline'>Update</button>
            </form>

        </div>
    );
};

export default MyProfile;