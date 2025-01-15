import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';



const JoinHRManager = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = (data) => console.log(data);
    return (
        <div className='w-11/12 md:w-8/12 lg:w-6/12 mx-auto'>
            <div>

                <h1 className='text-center text-3xl mt-6 font-bold'>Join as HR Manager</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Full Name</span>
                        </label>
                        <input type="text"  {...register("hrName", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                        {errors.name && <span className="text-red-600">Name is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Company Name</span>
                        </label>
                        <input type="text"  {...register("companyName", { required: true })} name="companyName" placeholder="Company Name" className="input input-bordered" />
                        {errors.name && <span className="text-red-600">Company Name is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Company Logo</span>
                        </label>
                        <input type="text"  {...register("companyLogo", { required: true })} placeholder="Company Logo" className="input input-bordered" />
                        {errors.photoURL && <span className="text-red-600">Company Logo is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date of Birth</span>
                        </label>
                        <input type="date"  {...register("DOF", { required: true })} placeholder="Date of Birth" className="input input-bordered" />
                        {errors.photoURL && <span className="text-red-600">Date of Birth is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Company Logo</span>
                        </label>
                        <select defaultValue="default" {...register('package', { required: true })}
                            className="select select-bordered w-full">
                            <option disabled value="default">Select a Package</option>
                            <option value="basic">Basic Plan</option>
                            <option value="standard">Standard Plan</option>
                            <option value="premium">Premium Plan</option>
                        </select>
                        {errors.photoURL && <span className="text-red-600">Plan is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                        {errors.email && <span className="text-red-600">Email is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
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
                        <input className="btn btn-outline border-b-4 hover:bg-green-600 border-b-orange-200" type="submit" value="Join HR Manager"/>
                    </div>
                </form>
                <p className="px-2 pb-4 text-center"><small>Already have an account <Link className='text-orange-700 underline' to="/login">Login</Link></small></p>




            </div>
        </div>
    );
};

export default JoinHRManager;