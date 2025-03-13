"use client";
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold text-center mb-8">Dashboard</h2>
        <ul className="space-y-4">
          <li><a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">Home</a></li>
          <li><a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">Users</a></li>
          <li><a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">Settings</a></li>
          <li><a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">Analytics</a></li>
        </ul>
      </div> */}

      {/* Main content area */}
      <div className="flex-1 p-8">
        {/* Header */}
        {/* <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Welcome to Your Dashboard</h1>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Logout</button>
        </div> */}

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-3 gap-6">
          {/* Widget 1 */}
          {/* <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">User Statistics</h3>
            <p className="text-2xl font-bold text-blue-500">1,234</p>
            <p className="text-sm text-gray-600">Total Users</p>
          </div> */}

          {/* Widget 2 */}
          {/* <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Revenue</h3>
            <p className="text-2xl font-bold text-green-500">$12,345</p>
            <p className="text-sm text-gray-600">Total Revenue</p>
          </div> */}

          {/* Widget 3 */}
          {/* <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Performance</h3>
            <p className="text-2xl font-bold text-yellow-500">85%</p>
            <p className="text-sm text-gray-600">Performance Score</p>
          </div> */}
        </div>

        {/* Recent Activity */}
        {/* <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <span className="text-sm text-gray-700">User John Doe registered</span>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm text-gray-700">User Jane Smith logged in</span>
                <span className="text-xs text-gray-500">4 hours ago</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm text-gray-700">New sale made: $1,234</span>
                <span className="text-xs text-gray-500">6 hours ago</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm text-gray-700">User Mike Johnson updated profile</span>
                <span className="text-xs text-gray-500">1 day ago</span>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
