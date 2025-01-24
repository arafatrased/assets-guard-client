import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <h2 className='text-4xl text-red font-bold my-4'>404</h2>
            <button className='btn btn-outline' onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
};

export default ErrorPage;