
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import img1 from '../../assets/home/banner1.jpeg'
import img2 from '../../assets/home/employee.jpeg'


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

import { Link } from 'react-router-dom';

export default function Banner() {
  return (
    <div className="font-mono dark:bg-gray-800">
      <Swiper
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        modules={[Navigation]}
        className="mySwiper overflow-hidden h-[60vh] md:h-[80vh] relative"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative dark:bg-gray-800 flex items-center h-[60vh] md:h-[80vh] bg-orange-50">
            <img
              src={img1}
              className="w-[30rem] md:pl-12 rounded-md h-[25rem]"
              alt=""
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-xl flex flex-col justify-center border-2 items-center backdrop-blur-sm">
                <h1 className="text-3xl dark:text-white font-bold mb-8">HR Manager</h1>
                <Link to="/joinhrmanager" className="btn dark:text-white btn-outline">
                  Join as HR Manager
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative flex dark:bg-gray-800 items-center h-[60vh] md:h-[80vh] bg-slate-50">
            <img
              src={img2}
              className="w-[30rem] md:pl-12 rounded-md h-[25rem]"
              alt=""
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-xl flex flex-col justify-center items-center backdrop-blur-sm border-2">
                <h1 className="text-3xl dark:text-white font-bold mb-8">Employee</h1>
                <Link to="/joinemployee" className="btn btn-outline dark:text-white">
                  Join as an Employee
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Custom Navigation Buttons */}
        <div className="custom-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-200">
          ❮
        </div>
        <div className="custom-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-200">
          ❯
        </div>
      </Swiper>
    </div>
  );
}
