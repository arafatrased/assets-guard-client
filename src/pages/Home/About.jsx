import React from 'react';

const About = () => {
    return (
        <div className='w-10/12 mx-auto dark:bg-black dark:text-white my-6'>
            <h1 className='text-center text-3xl font-mono uppercase font-bold my-3'>About Us</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 font-mono'>
                <div className="bg-white dark:bg-black dark:text-white p-6 border-r-2 border-b-2">
                    <h2 className="text-xl uppercase font-bold mb-2">Offering to Go Big</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-justify mb-4">Go Big with us! Expand your team effortlessly with our flexible subscription options. Choose the plan that best suits your growth needs and unlock your team's full potential.</p>
                    {/* <button
                        className="btn btn-outline border-b-4 border-b-orange-200"
                        onClick={() => window.open(buttonLink, '_blank')}
                    >
                        See More
                        
                    </button> */}
                </div>
                <div className="bg-white dark:bg-black dark:text-white border-b-2 p-6">
                    <h2 className="text-xl uppercase font-bold mb-2">Managing All Assets</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-justify mb-4">You can maintain the practice of overseeing and controlling an organization's assets to maximize their value and minimize risks. Effective asset management helps businesses improve efficiency, reduce costs, and enhance overall performance.</p>
                    {/* <button
                        className="btn btn-outline border-b-4 border-b-orange-200"
                        onClick={() => window.open(buttonLink, '_blank')}
                    >
                        See More
                        
                    </button> */}
                </div>
                <div className="bg-white dark:bg-black dark:text-white p-6 border-r-2">
                    <h2 className="text-xl uppercase font-bold mb-2">Managers Guidance</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-justify mb-4">Managers is overseeing and guiding a workforce to achieve organizational goals. Managers can add asset, approve team members, delete members, approve request of assets from employee and many more.</p>
                    {/* <button
                        className="btn btn-outline border-b-4 border-b-orange-200"
                        onClick={() => window.open(buttonLink, '_blank')}
                    >
                        See More
                        
                    </button> */}
                </div>
                <div className="bg-white dark:bg-black dark:text-white p-6">
                    <h2 className="text-xl uppercase font-bold mb-2">Extending efficiency</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-justify mb-4">It's about optimizing processes, resources, and time to achieve the same or better results while minimizing waste and maximizing output. Managing emplyee and assets gives a boost on that we offer.</p>
                    {/* <button
                        className="btn btn-outline border-b-4 border-b-orange-200"
                        onClick={() => window.open(buttonLink, '_blank')}
                    >
                        See More
                        
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default About;