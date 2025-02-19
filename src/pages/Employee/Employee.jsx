import React, { useState, useEffect } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import useAuth from '../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';

const Employee = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Fetch pending requests
    const { data: pendingRequests = [] } = useQuery({
        queryKey: ['pendingRequests'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/requests/pending?email=${user?.email}`);
            return res.data;
        },
    });

    const { data: userStatus = [], refetch } = useQuery({
        queryKey: ['userStatus'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users?email=${user?.email}`);
            return res.data;
        },
    })

    // Fetch monthly requests
    const { data: monthlyRequests = [] } = useQuery({
        queryKey: ['monthlyRequests'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/requests/monthly?email=${user?.email}`);
            return res.data;
        },
    });

    return (
        <div className="w-11/12 dark:bg-black dark:text-white mx-auto my-5 font-mono">
            <Helmet>
                <title>Employee | Dashboard</title>
            </Helmet>
            <h1 className="text-2xl text-center font-bold mb-6 uppercase"><span className='text-green-700'>Welcome</span>, {user?.displayName}</h1>
            <marquee behavior="" direction="">
                <h1 className="text-2xl text-center text-red-800 font-bold mb-6 uppercase">{
                    userStatus?.role === 'unaffiliated' ? 'Unaffiliated Employee!!!! Contact HR' : 'Employee'
                }</h1>
            </marquee>

            <div className="w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pending Requests Section */}
                <section className="mb-8 bg-gradient-to-r from-white to-orange-100 flex flex-col dark:bg-gradient-to-r dark:from-black dark:to-gray-700 dark:text-white gap-2 items-center justify-center border-2 border-orange-500 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">My Pending Requests</h2>
                    {pendingRequests.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {pendingRequests.map((request) => (
                                <li key={request._id}>
                                    {request.product_name} - <span className="text-red-500">{request.status}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No pending requests.</p>
                    )}
                </section>

                {/* Monthly Requests Section */}
                <section className="mb-8 bg-gradient-to-r from-white to-orange-100 flex flex-col gap-2 dark:bg-gradient-to-r dark:from-black dark:to-gray-700 dark:text-white items-center justify-center border-2 border-orange-500 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">My Monthly Requests</h2>
                    {monthlyRequests.length > 0 ? (
                        <ul className="list-decimal list-inside">
                            {monthlyRequests.map((request) => (
                                <li key={request._id}>
                                    {request.product_name} - <span className="text-gray-500">{new Date(request.requestDate).toLocaleDateString()}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No requests made this month.</p>
                    )}
                </section>

            </div>

            <section className="mb-8 ">
                <h2 className="text-xl font-semibold my-8 text-center uppercase">Remainders</h2>
                {
                    userStatus.role === 'unaffiliated' ? <p className="text-center text-red-700">You are not affiliated to any team. Contact HR for more information.</p> : <div className="w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Calendar */}
                        <div className='dark:bg-gradient-to-r dark:from-black dark:to-gray-700 dark:text-white'>
                            <h3 className="text-lg font-semibold mb-2">Calendar</h3>
                            <Calendar className='dark:bg-black dark:text-white' value={selectedDate} onChange={setSelectedDate} />
                        </div>

                 
                        <div className='flex bg-gradient-to-r from-white to-orange-100 flex-col dark:bg-gradient-to-r dark:from-black dark:to-gray-700 dark:text-white gap-2 items-center justify-center border-2 border-orange-500 p-4 rounded-lg'>
                            <h3 className="text-lg font-semibold mb-2">Events</h3>
                            <ul>
                                <li>Team meeting - 25th Feb</li>
                                <li>Deadline - 30th Feb</li>
                            </ul>
                        </div>
                    </div>
                }
            </section>
        </div>
    );
};

export default Employee;
