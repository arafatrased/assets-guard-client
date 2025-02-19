import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import updatePic from '../../assets/updateProfile.svg'

const Profile = () => {
    const { user, updateUserProfile, setLoading } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const displayName = form.name?.value;
        const photoURL = form.photoURL?.value;
        console.log(displayName, photoURL)
        updateUserProfile(displayName, photoURL)
            .then(() => {
                const userInfo = {
                    email: user?.email,
                    displayName,
                    photoURL
                }
                console.log(userInfo)

                axiosPublic.patch('/users-profile', userInfo)
                    .then(res => {
                        navigate('/employee');
                        console.log(res.data)
                    })
                setLoading(false)
                toast.success('Profile updated successfully');
            })
            .catch((error) => {
                toast.error('Failed to update profile');
            });
    }
    return (
        <div className='min-h-screen font-mono w-11/12 md:w-9/12 mx-auto p-5'>
            <Helmet>
                <title>Employee | Update Profile</title>
            </Helmet>
            <h2 className='my-8 text-2xl font-mono font-bold uppercase text-center'>Update Your Profile</h2>

            <div className='grid grid-cols-1 md:grid-cols-2'>
                <div>
                    <img src={updatePic} alt="" />
                </div>
                <div className='flex items-center justify-center md:border-l-2'>
                    <form onSubmit={handleProfileUpdate} className='flex flex-col gap-4 items-center'>
                        <div className="w-full">
                            <label htmlFor="name" className="text-[15px] font-[400]">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your name"
                                className="border-[#e5eaf2] dark:bg-gray-700 dark:text-white border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="name" className="text-[15px] font-[400]">
                                photoURL <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="photoURL"
                                placeholder="Your name"
                                className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full dark:bg-gray-700 dark:text-white mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                            />
                        </div>
                        <button type="submit" className='btn dark:bg-gray-700 dark:text-white btn-outline'>Update</button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Profile;