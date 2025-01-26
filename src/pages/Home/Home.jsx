import React from 'react';
import Banner from './Banner';
import About from './About';
import PackagesSection from './PackagesSection';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Home | Asset Guard</title>
            </Helmet>
            <Banner></Banner>
            <About></About>
            <PackagesSection></PackagesSection>
        </div>
    );
};

export default Home;