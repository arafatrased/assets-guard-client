import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <h2 className='text-4xl text-red font-bold my-4'>404</h2>
            <Link className='btn btn-outline' to="/">Back to Home</Link>
        </div>
    );
};

export default ErrorPage;