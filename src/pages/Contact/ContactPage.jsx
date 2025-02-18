import React from 'react';
import toast from 'react-hot-toast';

export default function ContactPage() {

    const handleContactSubmit = (e) =>{
        e.preventDefault();
        toast.success('Message send successfully!')
        e.target.reset();
    }

  return (
    <div className="min-h-screen dark:bg-black dark:text-white font-mono  flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center dark:bg-black dark:text-white text-gray-800 mb-8">Contact Us</h1>

        <div className="bg-white dark:bg-black dark:ring-2 dark:text-white shadow-md rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* Contact Form */}
          <div className="p-8">
            <h2 className="text-2xl dark:text-white font-semibold text-gray-800 mb-4">Get In Touch</h2>
            <p className="text-gray-600 dark:text-white mb-6">We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.</p>

            <form onSubmit={(e) => handleContactSubmit(e)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block dark:text-white text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" className="mt-1 block w-full px-4  py-2 dark:bg-gray-700 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="Your Name" required/>
              </div>

              <div>
                <label htmlFor="email" className="block dark:text-white text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" className="mt-1 block w-full px-4 py-2 dark:bg-gray-700 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="Your Email" required />
              </div>

              <div>
                <label htmlFor="message" className="block dark:text-white text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" rows="5" className="mt-1 block w-full px-4 py-2 border dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="Your Message" required></textarea>
              </div>

              <button type="submit" className="w-full bg-orange-50 hover:bg-orange-100 text-black font-bold py-2 px-4 rounded-md shadow-md transition">Send Message</button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-orange-50 dark:bg-black dark:text-white p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold dark:text-white text-indigo-800 mb-4">Contact Information</h2>
            <p className="text-gray-700 dark:text-white mb-6">Feel free to reach out to us directly through any of the following methods:</p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8c0-2.21-1.79-4-4-4S8 5.79 8 8c0 2.21 1.79 4 4 4s4-1.79 4-4z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" />
                  </svg>
                </span>
                <p className="text-gray-800 dark:text-white font-medium">Sadar Road, BCC, Bangladesh</p>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v7a2 2 0 01-2 2h-2M3 8h2a2 2 0 012 2v7a2 2 0 01-2 2H3m4 0h10" />
                  </svg>
                </span>
                <p className="text-gray-800 dark:text-white font-medium">01639199519</p>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8c0-2.21-1.79-4-4-4S8 5.79 8 8c0 2.21 1.79 4 4 4s4-1.79 4-4z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" />
                  </svg>
                </span>
                <p className="text-gray-800 font-medium dark:text-white">assetguard@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
