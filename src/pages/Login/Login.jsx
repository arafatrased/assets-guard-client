import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import SocialLogin from '../../shared/SocialLogin/SocialLogin';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';

const Login = () => {
    const { user: authuser, signIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                axiosPublic.get(`/users?email=${user?.email}`)
                    .then(res => {
                        const dbuser = res.data;
                        if (dbuser?.role === 'admin') {
                            navigate('/admin')
                        } else if (dbuser?.role === 'employee') {
                            navigate('/employee')
                        }else{
                            return toast.error('Invalid User Try');
                        }
                    })
                    .catch(err => {
                        toast.error('Invalid User Try')
                    })

            })
            .catch(err => {
                toast.error('Invalid User Try')
            })
    };

    return (
        <div className='w-11/12 md:w-8/12 lg:w-6/12 mx-auto'>
            <h1 className='text-center text-3xl mt-6 font-bold'>Log In</h1>
            <div className='card-body'>
                <form onSubmit={handleSubmit(onSubmit)} className="">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email <span className='text-red-700'>*</span></span>
                        </label>
                        <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                        {errors.email && <span className="text-red-600">Email is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password <span className='text-red-700'>*</span></span>
                        </label>
                        <input type="password"  {...register("password", {
                            required: true,
                            // minLength: 6,
                            // maxLength: 20,
                            // pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                        })} placeholder="password" className="input input-bordered" />
                        {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                        {/* {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                              {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                              {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>} */}
                        {/* <label className="label">
                                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                              </label> */}
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn btn-outline border-b-4 hover:bg-green-600 border-b-orange-200" type="submit" value="Log In" />
                    </div>

                </form>
                <SocialLogin></SocialLogin>
            </div>

        </div>
    );
};

export default Login;