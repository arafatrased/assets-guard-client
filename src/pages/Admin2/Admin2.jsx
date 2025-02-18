import React from 'react';

export default function Admin2() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <div className="text-xl font-bold mb-4">Social.</div>
        <nav>
          <ul className="space-y-4">
            <li className="text-blue-600 font-medium">Dashboard</li>
            <li>Analytics</li>
            <li>Publishing Schedule</li>
            <li>Conversations</li>
            <li>Account</li>
            <li>Settings</li>
            <li>Log Out</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Profile Statistics</h1>
          <div className="flex items-center space-x-4">
            <span>🔔</span>
            <div className="flex items-center space-x-2">
              <span className="font-medium">Jason Statham</span>
              <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full w-10 h-10" />
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 shadow rounded-lg text-center">
            <h2 className="font-bold">Profile Views</h2>
            <p className="text-xl">18,000</p>
          </div>
          <div className="bg-white p-4 shadow rounded-lg text-center">
            <h2 className="font-bold">Followers</h2>
            <p className="text-xl">10,000</p>
          </div>
          <div className="bg-white p-4 shadow rounded-lg text-center">
            <h2 className="font-bold">Likes</h2>
            <p className="text-xl">8,000</p>
          </div>
          <div className="bg-white p-4 shadow rounded-lg text-center">
            <h2 className="font-bold">Shares</h2>
            <p className="text-xl">5,000</p>
          </div>
        </div>

        {/* Graph and Data Sections */}
        <div className="grid grid-cols-2 gap-4">
          {/* Profile Stats Chart */}
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="font-bold mb-4">Profile Stats</h2>
            <div className="h-48 bg-gray-200 flex justify-center items-center">Chart Placeholder</div>
          </div>

          {/* Visitor Profile Chart */}
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="font-bold mb-4">Visitor Profile</h2>
            <div className="h-48 bg-gray-200 flex justify-center items-center">Pie Chart Placeholder</div>
          </div>
        </div>

        {/* Map and Distribution */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="font-bold mb-4">Data Distribution</h2>
            <div className="h-40 bg-gray-200 flex justify-center items-center">Data Placeholder</div>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="font-bold mb-4">Map Distribution</h2>
            <div className="h-40 bg-gray-200 flex justify-center items-center">Map Placeholder</div>
          </div>
        </div>
      </div>
    </div>
  );
}
