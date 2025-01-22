import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';


const JoinEmployee = () => {
    const { user } = useContext(AuthContext); // Assuming `logout` is a function provided by your AuthProvider
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {createUser, updateUserProfile} = useContext(AuthContext);
    const { data: navdata, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            if (!user?.email) return null;
            const res = await axiosPublic.get(`/users?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
        .then(result =>{
            const user = result.user;
            console.log(user);
            updateUserProfile(data.empName, data.photoURL)
            .then(()=>{
                const userInfo = {
                    email: data.email,
                    displayName: data.empName,
                    role: 'employee',
                    photoURL: data.photoURL
                }
                axiosPublic.post('/users', userInfo)
                .then(res => {
                    console.log(res.data);
                    navigate('/employee');
                    refetch();
                })
            })
            .catch(error =>{
                console.log(error)
            })   
        })
        .catch(error =>console.log(error))
       

        
        
        
    
    
    }
    return (
        <div className='w-11/12 md:w-8/12 lg:w-6/12 mx-auto'>
            <h1 className='text-center text-3xl mt-6 font-bold'>Join as Employee</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Full Name <span className='text-red-700'>*</span></span>
                    </label>
                    <input type="text" {...register("empName", { required: true })} name="empName" placeholder="Full Name" className="input input-bordered"/>
                    {errors.empName && <span className="text-red-600">Name is required</span>}
                </div>
                <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date of Birth <span className='text-red-700'>*</span></span>
                        </label>
                        <input type="date"  {...register("DOF", { required: true })} placeholder="Date of Birth" className="input input-bordered" />
                        {errors.DOF && <span className="text-red-600">Date of Birth is required</span>}
                </div>
                <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL <span className='text-red-700'>*</span></span>
                        </label>
                        <input type="text"  {...register("photoURL")} placeholder="Photo URL" className="input input-bordered" />
                        {errors.DOF && <span className="text-red-600">PhotoURL</span>}
                </div>
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
                    <input className="btn btn-outline border-b-4 hover:bg-green-600 border-b-orange-200" type="submit" value="Join Employee" />
                </div>
            </form>
        </div>
    );
};

export default JoinEmployee;