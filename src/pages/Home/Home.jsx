import React from 'react';
import Banner from './Banner';
import About from './About';
import PackagesSection from './PackagesSection';

const Home = () => {
    return (
        <div className="min-h-screen">
            <Banner></Banner>
            <About></About>
            <PackagesSection></PackagesSection>
        </div>
    );
};

export default Home;