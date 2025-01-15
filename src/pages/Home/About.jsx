import React from 'react';

const About = () => {
    return (
        <div className='w-10/12 mx-auto my-6'>
            <h1 className='text-center text-3xl font-mono uppercase font-bold my-3'>About Us</h1>
            <div className='grid grid-cols-2'>
                <div className="bg-white p-6 border-r-2 border-b-2">
                    <h2 className="text-xl font-bold mb-2">Title</h2>
                    <p className="text-gray-600 mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat doloribus adipisci harum repellendus perspiciatis nulla amet dignissimos, cum pariatur impedit.</p>
                    <button
                        className="btn btn-outline border-b-4 border-b-orange-200"
                        onClick={() => window.open(buttonLink, '_blank')}
                    >
                        See More
                        
                    </button>
                </div>
                <div className="bg-white border-b-2 p-6">
                    <h2 className="text-xl font-bold mb-2">Title</h2>
                    <p className="text-gray-600 mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat doloribus adipisci harum repellendus perspiciatis nulla amet dignissimos, cum pariatur impedit.</p>
                    <button
                        className="btn btn-outline border-b-4 border-b-orange-200"
                        onClick={() => window.open(buttonLink, '_blank')}
                    >
                        See More
                        
                    </button>
                </div>
                <div className="bg-white p-6 border-r-2">
                    <h2 className="text-xl font-bold mb-2">Title</h2>
                    <p className="text-gray-600 mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat doloribus adipisci harum repellendus perspiciatis nulla amet dignissimos, cum pariatur impedit.</p>
                    <button
                        className="btn btn-outline border-b-4 border-b-orange-200"
                        onClick={() => window.open(buttonLink, '_blank')}
                    >
                        See More
                        
                    </button>
                </div>
                <div className="bg-white p-6">
                    <h2 className="text-xl font-bold mb-2">Title</h2>
                    <p className="text-gray-600 mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat doloribus adipisci harum repellendus perspiciatis nulla amet dignissimos, cum pariatur impedit.</p>
                    <button
                        className="btn btn-outline border-b-4 border-b-orange-200"
                        onClick={() => window.open(buttonLink, '_blank')}
                    >
                        See More
                        
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;