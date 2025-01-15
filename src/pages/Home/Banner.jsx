import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import img1 from '../../assets/home/banner1.jpeg'
import img2 from '../../assets/home/employee.jpeg'


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';

export default function Banner() {
    return (
        <div className=''>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper overflow-hidden h-[60vh] md:h-[80vh]">

                <SwiperSlide>
                    <div className='relative flex items-center h-[60vh] md:h-[80vh] bg-orange-50'>
                        <img src={img1} className='w-[30rem] md:pl-12 rounded-md h-[25rem]' alt="" />
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="w-64 h-64 rounded-xl flex flex-col justify-center border-2 items-center  backdrop-blur-sm">
                                <h1 className='text-3xl font-bold mb-8'>HR Manager</h1>
                                <button className='btn btn-outline'>Join as HR Manager</button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>


                <SwiperSlide>
                    <div className='relative flex items-center h-[60vh] md:h-[80vh] bg-slate-50'>
                        <img src={img2} className='w-[30rem] md:pl-12 rounded-md h-[25rem]' alt="" />
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="w-64 h-64 rounded-xl flex flex-col justify-center items-center backdrop-blur-sm border-2">
                                <h1 className='text-3xl font-bold mb-8'>Employee</h1>
                                <button className='btn btn-outline'>Join as an Employee</button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>


            </Swiper>
        </div>
    );
}
