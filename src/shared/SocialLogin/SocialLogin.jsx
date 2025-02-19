import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import toast from 'react-hot-toast';

const SocialLogin = () => {
    const { user, googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();


    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    displayName: result.user?.displayName,
                    role: "unaffiliated",
                    photoURL: result.user?.photoURL
                };
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (userInfo.role === 'admin') {
                            navigate('/admin')
                        } else if (userInfo.role === 'employee') {
                            navigate('/employee')
                        } else if (userInfo.role === 'unaffiliated') {
                            navigate('/employee')
                        }
                        else {
                            return toast.error('Invalid User Try');
                        }


                    })
            })
    }
    return (
        <div className="dark:bg-black dark:text-white">
            <div className="divider"></div>
            <div className='w-full'>
                <button onClick={handleGoogleSignIn} className="btn dark:bg-black dark:text-white btn-outline w-full border-b-4 hover:bg-green-600 border-b-orange-200">
                    <FcGoogle className="mr-2"></FcGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;